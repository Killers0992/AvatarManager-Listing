import { baseLayerLuminance, StandardLuminance } from 'https://unpkg.com/@fluentui/web-components';

const LISTING_URL = "{{ listingInfo.Url }}";

const PACKAGES = {
{{~ for package in packages ~}}
  "{{ package.Name }}": {
    name: "{{ package.Name }}",
    displayName: "{{ if package.DisplayName; package.DisplayName; end; }}",
    description: "{{ if package.Description; package.Description; end; }}",
    version: "{{ package.Version }}",
    author: {
      name: "{{ if package.Author.Name; package.Author.Name; end; }}",
      url: "{{ if package.Author.Url; package.Author.Url; end; }}",
    },
    dependencies: {
      {{~ for dependency in package.Dependencies ~}}
        "{{ dependency.Name }}": "{{ dependency.Version }}",
      {{~ end ~}}
    },
    keywords: [
      {{~ for keyword in package.Keywords ~}}
        "{{ keyword }}",
      {{~ end ~}}
    ],
    license: "{{ package.License }}",
    licensesUrl: "{{ package.LicensesUrl }}",
  },
{{~ end ~}}
};

const setTheme = () => {
  const isDarkTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkTheme()) {
    baseLayerLuminance.setValueFor(document.documentElement, StandardLuminance.DarkMode);
  } else {
    baseLayerLuminance.setValueFor(document.documentElement, StandardLuminance.LightMode);
  }
}

(() => {
  setTheme();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTheme();
  });

  const vccAddRepoButton = document.getElementById('vccAddRepoButton');
  vccAddRepoButton.addEventListener('click', () => window.location.assign(`vcc://vpm/addRepo?url=${encodeURIComponent(LISTING_URL)}`));
})();
