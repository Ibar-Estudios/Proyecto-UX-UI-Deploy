import SectionViewer from './SectionViewer';

export default function Planteamiento() {
    return (
        <div className="min-h-[80vh] py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
                    ← Volver Home
                </a>
                <SectionViewer
                    sectionName="Planteamiento"
                    title="2.Planteamiento"
                    description="Definición del problema, el usuario, la solución y los objetivos."
                />
            </div>
        </div>
    );
}
