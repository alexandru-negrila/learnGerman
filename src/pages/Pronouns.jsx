import { useLanguage } from '../hooks/useLanguage';
import pronounsData from '../data/pronouns.json';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

export default function Pronouns() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader
        icon={pronounsData.meta.icon}
        title={pronounsData.meta.title}
        description={pronounsData.meta.description}
      />

      <div className="space-y-4">
        {pronounsData.sections.map((section, i) => (
          <SectionCard
            key={i}
            title={section.title}
            description={section.description}
          >
            <DataTable
              headers={section.headers}
              rows={section.rows}
              highlightFirst
            />
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
