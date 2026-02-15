// SEO utility functions for JSON-LD structured data

export interface OrganizationJsonLd {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export interface WebPageJsonLd {
  name: string;
  description: string;
  url: string;
}

export function generateOrganizationJsonLd(org: OrganizationJsonLd) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    sameAs: org.sameAs || [],
  };
}

export function generateWebPageJsonLd(page: WebPageJsonLd) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateJobPostingJsonLd(job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  hiringOrganization: {
    name: string;
    sameAs: string;
    logo: string;
  };
  jobLocation: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  baseSalary?: {
    currency: string;
    value: number;
    unitText: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.hiringOrganization.name,
      sameAs: job.hiringOrganization.sameAs,
      logo: job.hiringOrganization.logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...job.jobLocation,
      },
    },
    ...(job.baseSalary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.baseSalary.currency,
        value: {
          "@type": "QuantitativeValue",
          value: job.baseSalary.value,
          unitText: job.baseSalary.unitText,
        },
      },
    }),
  };
}
