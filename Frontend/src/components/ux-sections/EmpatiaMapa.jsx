import SectionViewer from './SectionViewer';  // ← MISMO FOLDER

export default function EmpatiaMapa() {
    return (
        <div className="min-h-[80vh] py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
                    ← Volver Home
                </a>
                <SectionViewer
                    sectionName="MapaEmpatia"
                    title="6. Mapa Empatía"
                    description="Mapa de Empatía de los usuarios."
                />
            </div>
        </div>
    );
}