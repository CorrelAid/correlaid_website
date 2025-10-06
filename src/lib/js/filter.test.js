import {describe, it, expect} from 'vitest';
import {filter, filterByMultiple, filterStringSearch} from './filter.js';

describe('filter functions', () => {
  const mockProjects = [
    {
      id: 1,
      title: 'Data Analysis Project',
      summary: 'Analyzing survey data',
      organization: 'NGO ABC',
      teamSelection: true,
      projectTypes: ['analysis'],
      dataTypes: ['survey'],
      organizationSector: 'nonprofit',
    },
    {
      id: 2,
      title: 'Web Development',
      summary: 'Building a website',
      organization: 'Company XYZ',
      teamSelection: false,
      projectTypes: ['development'],
      dataTypes: ['none'],
      organizationSector: 'private',
    },
    {
      id: 3,
      title: 'Machine Learning Model',
      summary: 'Predictive modeling',
      organization: 'University',
      teamSelection: true,
      projectTypes: ['analysis', 'modeling'],
      dataTypes: ['structured'],
      organizationSector: 'education',
    },
  ];

  describe('filterByMultiple', () => {
    it('should filter by multiple project types', () => {
      const result = filterByMultiple(
        mockProjects,
        ['analysis'],
        'projectTypes',
      );
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual([1, 3]);
    });

    it('should filter by multiple values (ALL must be present)', () => {
      // Project 3 has both 'analysis' and 'modeling'
      const result = filterByMultiple(
        mockProjects,
        ['analysis', 'modeling'],
        'projectTypes',
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('should handle case insensitive filtering', () => {
      const result = filterByMultiple(
        mockProjects,
        ['ANALYSIS'],
        'projectTypes',
      );
      expect(result).toHaveLength(2);
    });
  });

  describe('filterStringSearch', () => {
    const searchOptions = [
      {searchProperty: 'title', multiple: false},
      {searchProperty: 'summary', multiple: false},
      {searchProperty: 'organization', multiple: false},
    ];

    it('should search in title', () => {
      const result = filterStringSearch('Data', searchOptions, mockProjects);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should search case insensitively', () => {
      const result = filterStringSearch('data', searchOptions, mockProjects);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    it('should search in multiple properties', () => {
      const result = filterStringSearch(
        'University',
        searchOptions,
        mockProjects,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('should return empty array when no matches', () => {
      const result = filterStringSearch(
        'nonexistent',
        searchOptions,
        mockProjects,
      );
      expect(result).toHaveLength(0);
    });
  });

  describe('filter (main function)', () => {
    const mockSelects = [
      {
        param: 'projectTypes',
        value: [{value: 'analysis'}],
        multiple: true,
      },
    ];

    const mockCheckBoxes = [
      {
        param: 'teamSelection',
        value: true,
      },
    ];

    const searchOptions = [
      {searchProperty: 'title', multiple: false},
      {searchProperty: 'summary', multiple: false},
    ];

    it('should filter with checkbox only', () => {
      const result = filter(mockProjects, [], null, [], mockCheckBoxes);
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual([1, 3]);
    });

    it('should filter with selects only', () => {
      const result = filter(mockProjects, mockSelects, null, [], []);
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual([1, 3]);
    });

    it('should filter with search term only', () => {
      const result = filter(mockProjects, [], 'Web', searchOptions, []);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it('should combine checkbox and select filters', () => {
      const checkBoxes = [{param: 'teamSelection', value: true}];
      const selects = [
        {
          param: 'projectTypes',
          value: [{value: 'analysis'}],
          multiple: true,
        },
      ];
      const result = filter(mockProjects, selects, null, [], checkBoxes);
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual([1, 3]);
    });

    it('should combine all filters', () => {
      const checkBoxes = [{param: 'teamSelection', value: true}];
      const selects = [
        {
          param: 'projectTypes',
          value: [{value: 'analysis'}],
          multiple: true,
        },
      ];
      const result = filter(
        mockProjects,
        selects,
        'Machine',
        searchOptions,
        checkBoxes,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });

    it('should return all projects when no filters applied', () => {
      const result = filter(mockProjects, [], null, [], []);
      expect(result).toHaveLength(3);
    });
  });
});
