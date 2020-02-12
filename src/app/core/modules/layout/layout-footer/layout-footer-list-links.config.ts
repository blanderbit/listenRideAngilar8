import {LinkConfig} from '../../../../shared/components/links/link.config';

// TODO: add ui-href instead of href here ? and vice versa
// TODO: add translation for countries or take them from Admin panel

export const LayoutFooterListLinksConfig: { [key: string]: LinkConfig[] } = {
  listnride: [
    {
      translationKey: 'footer.about',
      href: '/about'
    },
    {
      translationKey: 'footer.press',
      href: '/press'
    },
    {
      translationKey: 'footer.jobs',
      href: '/jobs'
    },
    {
      translationKey: 'settings.invite',
      href: '/invite'
    },
    {
      translationKey: 'shared.contact',
      href: '/help'
    }
  ],

  learnMore: [
    {
      translationKey: 'shared.how-it-works',
      href: '/howItWorks'
    },
    {
      translationKey: 'shared.listing-a-bike',
      href: '/listingABike'
    },
    {
      translationKey: 'shared.for-shops',
      href: '/businessCommunity'
    },
    {
      translationKey: 'shared.brands',
      href: '/brands'
    },
    {
      translationKey: 'shared.journal',
      href: 'http://journal.listnride.com'
    }
  ],

  topCountries: [
    {
      translationKey: 'Germany',
      href: '/germany'
    },
    {
      translationKey: 'Italy',
      href: '/italy'
    },
    {
      translationKey: 'Spain',
      href: '/spain'
    },
    {
      translationKey: 'Netherlands',
      href: '/netherlands'
    },
    {
      translationKey: 'Switzerland',
      href: '/switzerland'
    }
  ],

  legal: [
    {
      translationKey: 'footer.terms-and-conditions',
      href: '/terms'
    },
    {
      translationKey: 'footer.privacy-statement',
      href: '/privacy'
    },
    {
      translationKey: 'footer.sitemap',
      href: '/sitemap' // or '/countries'
    },
    {
      translationKey: 'shared.trust-and-safety',
      href: '/trustAndSafety'
    },
    {
      translationKey: 'footer.insurance',
      href: '/insurance'
    }
  ],
};
