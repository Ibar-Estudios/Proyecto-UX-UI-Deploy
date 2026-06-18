import SectionViewer from './SectionViewer';  // ← MISMO FOLDER

export default function PointOfView() {
    return (
        <div className="min-h-[80vh] py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
                    ← Volver Home
                </a>
                <SectionViewer
                    sectionName="PointOfView"
                    title="8. Point of view"
                    description="Centrar la solución en las necesidades reales del usuario, no en supuestos."
                />
            </div>
        </div>
    );
}