import { serializeJsonLd, type StructuredData } from "../../lib/seo";

type JsonLdProps = {
  data: StructuredData | StructuredData[];
};

export default function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => {
        const serialized = serializeJsonLd(schema);

        if (!serialized) {
          return null;
        }

        return (
          <script
            dangerouslySetInnerHTML={{ __html: serialized }}
            key={`jsonld-${index}`}
            type="application/ld+json"
          />
        );
      })}
    </>
  );
}
