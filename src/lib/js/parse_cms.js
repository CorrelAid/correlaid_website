import {gen_img_url} from './helpers.js';

export const parse = {
  heros: function (section) {
    const heroParams = {
      image: section.item.image,
      text: section.item.translations[0].text,
      height: section.item.height,
      gradient_only: section.item.gradient_only,
      buttons: section.item.buttons,
    };
    return heroParams;
  },
  ctas: function (section) {
    const ctaParams = {
      button_link: section.item.button.translations[0].link,
      button_color: section.item.button.translations[0].text,
      button_text: section.item.button.color,
      text: section.item.translations[0].text,
    };
    return ctaParams;
  },
  cta_group: function (section) {
    const ctas = [];
    for (const ctaRaw of section.item.ctas) {
      const cta = {
        button_link: ctaRaw.ctas_id.button.translations[0].link,
        button_text: ctaRaw.ctas_id.button.translations[0].text,
        button_color: ctaRaw.ctas_id.button.color,
        text: ctaRaw.ctas_id.translations[0].text,
      };
      ctas.push(cta);
    }
    return {ctas: ctas};
  },
  timelines: function (section) {
    const timelineParams = {
      steps: section.item.steps,
    };
    return timelineParams;
  },
  wysiwyg: function (section) {
    return {
      source: section.item.translations[0].content,
      options: '',
    };
  },
  contacts: function (section) {
    let imageUrl;

    if (section.item.person.image) {
      imageUrl = gen_img_url(
        section.item.person.image.id,
        'fit=cover&width=200&height=200&quality=80',
      );
    }

    const personParams = {
      name: section.item.person.name,
      img: imageUrl,
      email: section.item.person.email,
      position: section.item.translations[0].position,
      description: section.item.translations[0].description,
    };
    return personParams;
  },
  carousel: function (section) {
    return {
      carousel_elements: section.item.carousel_elements,
    };
  },
  quote_carousel: function (section) {
    return {
      quotes: section.item.quotes,
      text_only: section.item.text_only,
    };
  },
  buttons: function (section) {
    return {
      href: section.item.translations[0].link,
      text: section.item.translations[0].text,
      color: `bg-${section.item.color}`,
    };
  },
  custom_sections: function (section) {
    return;
  },
};
