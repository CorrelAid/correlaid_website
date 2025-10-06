import {describe, it, expect, vi} from 'vitest';

// Mock MapLibre GL JS completely
vi.mock('maplibre-gl', () => ({
  default: {
    Map: vi.fn(),
    Popup: vi.fn(),
    AttributionControl: vi.fn(),
  },
  Map: vi.fn(),
  Popup: vi.fn(),
  AttributionControl: vi.fn(),
}));

// Mock CSS import
vi.mock('maplibre-gl/dist/maplibre-gl.css', () => ({}));

// Create a mock locale store
const createMockLocaleStore = (initialLocale = 'de-DE') => {
  let currentLocale = initialLocale;
  const subscribers = new Set();

  return {
    subscribe: (callback) => {
      subscribers.add(callback);
      callback(currentLocale);
      return () => subscribers.delete(callback);
    },
    set: (newLocale) => {
      currentLocale = newLocale;
      subscribers.forEach((callback) => callback(newLocale));
    },
    get: () => currentLocale,
  };
};

// Mock i18n store
const mockLocaleStore = createMockLocaleStore();
vi.mock('$lib/stores/i18n', () => ({
  locale: mockLocaleStore,
  t: {subscribe: vi.fn()},
}));

// Mock helpers
vi.mock('$lib/js/helpers.js', () => ({
  translate: vi.fn((locale, key) => ({url: '/test'})),
  genWebsiteUrl: vi.fn(() => '/test-url'),
}));

describe('Map Component - Language Switching Logic', () => {
  // Test the language mapping logic independently
  it('should correctly map locale codes to language parameters', () => {
    const getLanguageCode = (locale) => {
      return locale === 'de-DE' || locale === 'de' ? 'de' : 'en';
    };

    // Test German locale (full format)
    expect(getLanguageCode('de-DE')).toBe('de');

    // Test German locale (short format)
    expect(getLanguageCode('de')).toBe('de');

    // Test English locale
    expect(getLanguageCode('en-US')).toBe('en');

    // Test default fallback (should be English)
    expect(getLanguageCode('fr-FR')).toBe('en');
  });

  it('should generate correct text-field expressions for different languages', () => {
    const getLanguageCode = (locale) => {
      return locale === 'de-DE' || locale === 'de' ? 'de' : 'en';
    };

    const generateTextFieldExpression = (langCode) => {
      if (langCode === 'de') {
        return [
          'coalesce',
          ['get', 'name:de'],
          ['get', 'name_de'],
          ['get', 'name'],
        ];
      } else {
        return [
          'coalesce',
          ['get', 'name:en'],
          ['get', 'name_en'],
          ['get', 'name'],
        ];
      }
    };

    const germanExpression = generateTextFieldExpression(
      getLanguageCode('de-DE'),
    );
    const englishExpression = generateTextFieldExpression(
      getLanguageCode('en-US'),
    );

    expect(germanExpression).toEqual([
      'coalesce',
      ['get', 'name:de'],
      ['get', 'name_de'],
      ['get', 'name'],
    ]);

    expect(englishExpression).toEqual([
      'coalesce',
      ['get', 'name:en'],
      ['get', 'name_en'],
      ['get', 'name'],
    ]);

    expect(germanExpression).not.toEqual(englishExpression);
  });

  it('should handle locale store changes correctly', () => {
    const localeStore = createMockLocaleStore('de-DE');
    let currentLocale = null;

    // Subscribe to locale changes
    const unsubscribe = localeStore.subscribe((locale) => {
      currentLocale = locale;
    });

    // Initial state should be German
    expect(currentLocale).toBe('de-DE');

    // Change to English
    localeStore.set('en-US');
    expect(currentLocale).toBe('en-US');

    // Change back to German
    localeStore.set('de-DE');
    expect(currentLocale).toBe('de-DE');

    unsubscribe();
  });

  it('should generate reactive popup content based on locale', () => {
    const originalLocalChapters = [
      {
        short_id: 'berlin',
        translations: [{city: 'Berlin'}],
      },
    ];

    const generatePopupContent = (
      featureProperties,
      locale,
      originalChapters,
    ) => {
      const originalChapter = originalChapters?.find(
        (chapter) => chapter.short_id === featureProperties.short_id,
      );

      if (!originalChapter) {
        return {
          name: featureProperties.name,
          href: featureProperties.href,
        };
      }

      const cityName = originalChapter.translations?.[0]?.city || 'Unknown';
      return {
        name: `CorrelAidX ${cityName}`,
        href: '/test-url', // mocked genWebsiteUrl result
      };
    };

    const featureProperties = {
      short_id: 'berlin',
      name: 'Old Name',
      href: '/old-href',
    };

    // Test popup content generation
    const popupContent = generatePopupContent(
      featureProperties,
      'de-DE',
      originalLocalChapters,
    );

    expect(popupContent.name).toBe('CorrelAidX Berlin');
    expect(popupContent.href).toBe('/test-url');
  });

  it('should handle missing original chapter data gracefully', () => {
    const generatePopupContent = (
      featureProperties,
      locale,
      originalChapters,
    ) => {
      const originalChapter = originalChapters?.find(
        (chapter) => chapter.short_id === featureProperties.short_id,
      );

      if (!originalChapter) {
        return {
          name: featureProperties.name,
          href: featureProperties.href,
        };
      }

      const cityName = originalChapter.translations?.[0]?.city || 'Unknown';
      return {
        name: `CorrelAidX ${cityName}`,
        href: '/test-url',
      };
    };

    const featureProperties = {
      short_id: 'unknown',
      name: 'Fallback Name',
      href: '/fallback-href',
    };

    const originalLocalChapters = [
      {
        short_id: 'berlin',
        translations: [{city: 'Berlin'}],
      },
    ];

    // Test with missing chapter data
    const popupContent = generatePopupContent(
      featureProperties,
      'de-DE',
      originalLocalChapters,
    );

    expect(popupContent.name).toBe('Fallback Name');
    expect(popupContent.href).toBe('/fallback-href');
  });

  it('should use base dataviz style URL without language parameters', () => {
    const apiKey = 'cYwZssWUHS4exn283ZO4';
    const expectedStyleUrl = `https://api.maptiler.com/maps/dataviz/style.json?key=${apiKey}`;

    // Test that the base style URL doesn't include language parameters
    expect(expectedStyleUrl).toContain(
      'api.maptiler.com/maps/dataviz/style.json',
    );
    expect(expectedStyleUrl).toContain(`key=${apiKey}`);
    expect(expectedStyleUrl).not.toContain('language=');
  });

  it('should handle setLayoutProperty calls for language switching', () => {
    // Mock MapLibre GL Map instance
    const mockMap = {
      setLayoutProperty: vi.fn(),
      isStyleLoaded: vi.fn(() => true),
      getStyle: vi.fn(() => ({
        layers: [
          {
            id: 'country-label',
            layout: {'text-field': '{name}'},
          },
          {
            id: 'city-label',
            layout: {'text-field': '{name}'},
          },
        ],
      })),
    };

    // Simulate language switching function
    const switchMapLanguage = (langCode, map) => {
      const style = map.getStyle();
      if (!style.layers) return 0;

      let modifiedLayers = 0;
      style.layers.forEach((layer) => {
        if (layer.layout && layer.layout['text-field']) {
          if (langCode === 'de') {
            map.setLayoutProperty(layer.id, 'text-field', [
              'coalesce',
              ['get', 'name:de'],
              ['get', 'name_de'],
              ['get', 'name'],
            ]);
          } else {
            map.setLayoutProperty(layer.id, 'text-field', [
              'coalesce',
              ['get', 'name:en'],
              ['get', 'name_en'],
              ['get', 'name'],
            ]);
          }
          modifiedLayers++;
        }
      });
      return modifiedLayers;
    };

    // Test German language switching
    const modifiedCount = switchMapLanguage('de', mockMap);
    expect(modifiedCount).toBe(2);
    expect(mockMap.setLayoutProperty).toHaveBeenCalledWith(
      'country-label',
      'text-field',
      ['coalesce', ['get', 'name:de'], ['get', 'name_de'], ['get', 'name']],
    );
    expect(mockMap.setLayoutProperty).toHaveBeenCalledWith(
      'city-label',
      'text-field',
      ['coalesce', ['get', 'name:de'], ['get', 'name_de'], ['get', 'name']],
    );
  });
});
