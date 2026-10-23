(() => {
  'use strict';
  const data = window.FIELDGUIDE;
  if (!data) return;
  const element = (tag, className, text) => {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text != null) item.textContent = text;
    return item;
  };
  const link = (text, url, className) => {
    const item = element('a', className, text);
    item.href = /^(https?:\/\/|assets\/)/.test(url) ? url : '#connect';
    return item;
  };
  const journey = document.getElementById('journey');
  data.journey.forEach(item => {
    const entry = element('li', item.current ? 'phase-current' : '');
    const detail = element('details');
    detail.append(element('summary', '', 'Details'), element('p', '', item.detail));
    entry.append(element('time', '', item.year), element('h3', '', item.label), element('p', 'lens', item.organization));
    if (item.highlight) {
      const highlight = element('p', 'phase-highlight');
      highlight.append(element('strong', '', item.highlight.value), element('span', '', item.highlight.text));
      entry.append(highlight);
    }
    if (item.summary) entry.append(element('p', 'phase-summary', item.summary));
    entry.append(detail);
    journey.append(entry);
  });
  const tabs = document.getElementById('case-tabs');
  const panels = document.getElementById('case-panels');
  const select = (index, focus = false) => {
    [...tabs.children].forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      panels.children[i].hidden = i !== index;
    });
    if (focus) tabs.children[index].focus();
  };
  data.projects.forEach((project, index) => {
    const button = element('button', 'case-tab');
    button.type = 'button';
    button.id = 'tab-' + project.id;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'case-' + project.id);
    button.append(element('span', '', project.nav), element('span', 'arr', '→'));
    button.querySelector('.arr').setAttribute('aria-hidden', 'true');
    tabs.append(button);
    const panel = element('article', 'case-panel');
    panel.id = 'case-' + project.id;
    panel.tabIndex = 0;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.append(element('p', 'eyebrow', project.setting), element('h3', '', project.title));
    [['Context', project.problem], ['My contribution', project.contribution], ['Purpose', project.purpose]].forEach(([heading, text]) => {
      const section = element('div', 'project-summary-part');
      section.append(element('h4', '', heading));
      (Array.isArray(text) ? text : [text]).forEach(paragraph => section.append(element('p', '', paragraph)));
      panel.append(section);
    });
    panels.append(panel);
    button.addEventListener('click', () => select(index));
  });
  select(0);
  tabs.addEventListener('keydown', event => {
    const current = [...tabs.children].indexOf(document.activeElement);
    if (current < 0) return;
    let next = current;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (current + 1) % data.projects.length;
    else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (current - 1 + data.projects.length) % data.projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = data.projects.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  });
  data.recent.forEach(item => {
    const card = element('article', 'recent-card');
    card.append(element('small', '', item.kind), element('h3', '', item.title), element('p', '', item.summary));
    const links = element('div', 'publication-links');
    item.links.forEach(destination => links.append(link(destination.label + ' ↗', destination.url)));
    card.append(links);
    document.getElementById('recent-items').append(card);
  });
  const other = document.getElementById('other-contributions');
  other.append(element('h3', '', 'Additional publications'));
  data.otherContributions.forEach(item => {
    const entry = element('div');
    entry.className = 'publication-reference';
    entry.append(link(item.title + ' ↗', item.url), element('p', '', item.venue));
    other.append(entry);
  });
  data.speaking.forEach(item => {
    const entry = element('li');
    entry.append(item.url ? link(item.name + ' ↗', item.url) : element('strong', '', item.name), element('span', '', item.detail));
    document.getElementById('speaking-engagements').append(entry);
  });
  data.education.forEach(item => {
    const entry = element('article', 'education-item' + (item.status !== 'Completed' ? ' continuing-study' : ''));
    entry.append(element('span', 'degree-status', item.status), element('h3', '', item.title), element('p', '', item.detail));
    document.getElementById('education').append(entry);
  });
  data.links.forEach(item => document.getElementById('links').append(link(item.label + ' ↗', item.url)));
  const photo = document.querySelector('.opening-photo');
  const compact = matchMedia('(max-width:700px)');
  const positionPhoto = () => {
    document.querySelector(compact.matches ? '.journey' : '.opening').append(photo);
    tabs.setAttribute('aria-orientation', compact.matches ? 'horizontal' : 'vertical');
  };
  compact.addEventListener('change', positionPhoto);
  positionPhoto();
  const fromHash = () => {
    const index = data.projects.findIndex(item => '#case-' + item.id === location.hash);
    if (index >= 0) select(index);
  };
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
