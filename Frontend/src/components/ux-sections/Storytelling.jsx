import SectionViewer from './SectionViewer';

export default function Storytelling() {
  return (
    <div className="min-h-[80vh] py-10 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Link para regresar al home */}
        <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
          ← Volver Home
        </a>
        <SectionViewer
          sectionName="Storytelling"
          title="9. Storytelling"
          description="Narrativas que conectan insights usuario con soluciones."
        />
      </div>
    </div>
  );
}