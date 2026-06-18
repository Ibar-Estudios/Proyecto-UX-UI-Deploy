import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// ─── Detecta cards anchas ──────────────────────────────────────────────────
function isWideCard(value) {
  if (Array.isArray(value)) {
    const totalChars = value.join("").length;
    return value.length > 6 || totalChars > 300;
  }
  if (typeof value === "string") return value.length > 200;
  return false;
}

// ─── Card de dato ──────────────────────────────────────────────────────────
function DataCard({ cardKey, value, index }) {
  const wide = isWideCard(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: "#13131f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "1.75rem",
        transition: "all 0.2s ease",
        gridColumn: wide ? "1 / -1" : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#1a1830";
        e.currentTarget.style.borderColor = "rgba(129,140,248,0.25)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#13131f";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Título de la card */}
      <h3
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#818cf8",
          marginBottom: "1rem",
          margin: "0 0 1rem 0",
        }}
      >
        {cardKey}
      </h3>

      {/* Array */}
      {Array.isArray(value) ? (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {value.map((item, i) => {
            if (typeof item === "string" && item.startsWith("━")) {
              return (
                <li key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "12px 0" }} />
              );
            }

            const isLabel =
              typeof item === "string" &&
              (item.startsWith("📄") ||
                item.startsWith("🗨️") ||
                item.startsWith("🧠") ||
                item.startsWith("🔗"));

            const isLink =
              typeof item === "string" && item.startsWith("🔗 http");

            if (isLink) {
              const url = item.replace("🔗 ", "");
              return (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span>🔗</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#818cf8",
                      fontSize: "12px",
                      textDecoration: "underline",
                      wordBreak: "break-all",
                    }}
                  >
                    {url}
                  </a>
                </li>
              );
            }

            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "8px",
                  marginTop: isLabel ? "14px" : 0,
                }}
              >
                {!isLabel && (
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      minWidth: "5px",
                      borderRadius: "50%",
                      background: "#6366f1",
                      marginTop: "7px",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: isLabel ? "13px" : "13px",
                    fontWeight: isLabel ? 800 : 400,
                    color: isLabel ? "#e2e8f0" : "#94a3b8",
                    lineHeight: 1.65,
                  }}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>

      ) : typeof value === "object" && value !== null ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.entries(value).map(([k, v]) => (
            <div
              key={k}
              style={{
                padding: "12px 14px",
                background: "#0e0e1a",
                borderLeft: "3px solid #4f46e5",
                borderRadius: "0 10px 10px 0",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#818cf8",
                  textTransform: "capitalize",
                  marginBottom: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                {k}
              </div>
              {Array.isArray(v) ? (
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {v.map((item, i) => (
                    <li key={i} style={{ fontSize: "12.5px", color: "#94a3b8", marginBottom: "4px", paddingLeft: "10px" }}>
                      · {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#c7d2fe",
                    background: "rgba(99,102,241,0.15)",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(129,140,248,0.25)",
                  }}
                >
                  {v}
                </span>
              )}
            </div>
          ))}
        </div>

      ) : (
        <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
          {value}
        </p>
      )}
    </motion.div>
  );
}

// ─── SectionViewer principal ───────────────────────────────────────────────
export default function SectionViewer({ sectionName, title, description }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/ux-sections/${sectionName}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, [sectionName]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "3px solid rgba(99,102,241,0.2)",
            borderTopColor: "#6366f1",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ fontSize: "13px", color: "#475569", letterSpacing: "0.1em" }}>
          Cargando {title}...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ maxWidth: "1152px", margin: "0 auto" }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", paddingTop: "3rem", marginBottom: "3rem" }}>
        <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">
          {data?.title || title}
        </h1>

        <div
          style={{
            width: "40px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
            margin: "0 auto 1.5rem",
          }}
        />

        {/* DESCRIPCIÓN DE LA SECCIÓN */}
        <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: "600px", margin: "0 auto", lineHeight: 1.75 }}>
          {data?.description || description}
        </p>
      </div>

      {/* CONTENT HTML */}
      {data?.content && (
        <div
          style={{
            background: "#13131f",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "2.5rem",
            marginBottom: "2.5rem",
          }}
          dangerouslySetInnerHTML={{
            __html: data.content
              // Negritas: gris claro, visibles sobre fondo oscuro
              .replace(/<strong(.*?)>(.*?)<\/strong>/g, '<strong$1 style="color:#155e75;font-weight:800;">$2</strong>')
              // Párrafos: gris azulado (#94a3b8) para contraste suave
              .replace(/<p(.*?)>/g, '<p$1 style="color:#94a3b8;margin-bottom:1.25rem;line-height:1.75;font-size:15px;">')
              // Links: violeta (#818cf8) para armonizar con títulos y bullets
              .replace(/<a /g, '<a style="color:#818cf8;text-decoration:underline; font-weight:600; font-size:14px; " ')
              // Saltos de línea: convertir \n en <br> para mantener formato en textos largos
              .replace(/\n/g, "<br>"),
          }}
        />
      )}


      {/* DATA ESTRUCTURADA */}
      {data?.data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
            paddingBottom: "3rem",
          }}
        >
          {Object.entries(data.data).map(([key, value], i) => (
            <DataCard key={key} cardKey={key} value={value} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}