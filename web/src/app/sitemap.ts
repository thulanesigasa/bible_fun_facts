import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://exegeomai.app";
  const lastModified = new Date();

  const routes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/#features`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/#how-it-works`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/#about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/#faq`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/#waitlist`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/waitlist-privacy`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/privacy`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/terms`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/data-safety`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/safety`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/safety-and-trust`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/security`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/community-guidelines`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/deletion`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/account-deletion`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/support`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/help`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/report-a-problem`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/features`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/how-it-works`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/strongs`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
