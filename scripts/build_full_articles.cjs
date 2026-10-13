const fs = require('fs');
const path = require('path');

const articlesData = [
  {
    id: 'rag-produccion-2026',
    slug: 'arquitectura-rag-produccion-guia-definitiva-2026',
    title: 'Arquitectura RAG en Producción: Estrategias Avanzadas de Recuperación, Reranking y Reducción de Latencia',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '12 min de lectura',
    publishedAt: '12 de Octubre, 2026',
    updatedAt: '13 de Octubre, 2026',
    wordCount: 1820,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Visualización abstracta de redes neuronales y nodos de datos vectoriales',
    tags: ['RAG', 'Vector DB', 'LLMs', 'Python', 'Búsqueda Híbrida'],
    featured: true,
    views: 14280,
    excerpt: 'Análisis exhaustivo sobre cómo escalar sistemas Retrieval-Augmented Generation eliminando alucinaciones, optimizando bases de datos vectoriales y reduciendo costos operativos en entornos empresariales de alta concurrencia.',
    keyTakeaways: [
      'La búsqueda puramente semántica (vectorial) falla en un 38% de consultas técnicas que contienen acrónimos, números de error o identificadores exactos; la búsqueda híbrida (BM25 + Dense) es obligatoria.',
      'El reranking con modelos de atención cruzada (cross-encoders) eleva la precisión de los top-3 fragmentos a más del 94.2%, reduciendo alucinaciones de raíz.',
      'Implementar compresión contextual y chunking jerárquico (Parent-Child) reduce los tokens de entrada en un 46%, recortando miles de dólares mensuales en costos de inferencia.',
      'El filtrado estricto de metadatos previo a la búsqueda vectorial (pre-filtering) optimiza los índices HNSW y evita barridos secuenciales innecesarios.'
    ],
    sections: [
      {
        id: 'el-mito-del-naive-rag',
        title: '1. El mito del Naive RAG y por qué fracasa en producción',
        paragraphs: [
          'Durante los primeros años de adopción de modelos generativos, la arquitectura estándar de RAG consistía en un flujo lineal engañosamente simple: tomar documentos en PDF o Markdown, dividirlos en trozos fijos de 500 tokens con un solapamiento del 10%, calcular embeddings con un modelo estándar y almacenar los vectores en una base de datos para consultar mediante similitud de coseno. En demostraciones internas este enfoque parecía prometedor. Sin embargo, cuando estos sistemas se exponen al tráfico real de usuarios en producción corporativa, las deficiencias arquitectónicas se manifiestan con severidad.',
          'El primer gran problema radica en la distribución lingüística de las consultas reales. Un usuario final rara vez formula preguntas completas con la misma sintaxis y riqueza semántica que el manual técnico original. Si un ingeniero consulta "error 504 en microservicio de pagos tras migración de VPC", un recuperador puramente semántico a menudo devuelve fragmentos que hablan de pasarelas de pago generales o políticas de facturación a clientes, simplemente porque contienen palabras afines en el espacio latente. La semántica densa tiende a ignorar términos clave precisos como códigos de error, identificadores de versiones o variables de entorno.',
          'El segundo fallo crítico es el fenómeno cognitivo conocido como "Lost in the Middle" (pérdida en el medio). Cuando inyectamos al modelo de lenguaje 10 o 15 fragmentos recuperados para responder una pregunta, los transformers prestan una atención desproporcionadamente alta al inicio y al final de la ventana de contexto, ignorando detalles cruciales ubicados en el tercio intermedio. Si el fragmento que contiene la solución real al problema quedó posicionado en el séptimo lugar de la lista, el modelo frecuentemente alucina una respuesta plausible pero técnicamente incorrecta.',
          'En 4kt hemos auditado decenas de despliegues donde equipos de desarrollo intentaban compensar una mala etapa de recuperación utilizando modelos generadores más grandes y costosos. La realidad empírica demuestra que ningún modelo generativo, por masivo y sofisticado que sea, puede responder con precisión si la información inyectada en su contexto carece de relevancia exacta y pureza estructural.'
        ],
        callout: {
          type: 'tip',
          title: 'Axioma Fundamental de RAG en 4kt',
          content: 'La calidad de una respuesta generativa nunca superará la precisión de los fragmentos recuperados. Invertir tiempo en afinar el recuperador y el reranker rinde 10 veces más dividendos que cambiar de modelo generador.'
        }
      },
      {
        id: 'segmentacion-jerarquica-busqueda-hibrida',
        title: '2. Segmentación Jerárquica (Parent-Child) y Búsqueda Híbrida',
        paragraphs: [
          'Para superar las limitaciones del troceo fijo, la arquitectura moderna de 2026 implementa la segmentación jerárquica contextual, comúnmente denominada indexación Padre-Hijo (Parent-Child Chunking). Esta técnica resuelve una paradoja intrínseca de los embeddings: los modelos de embeddings capturan con mucha mayor precisión semántica la esencia de fragmentos pequeños (oraciones o párrafos de 80 a 150 tokens) que la de documentos extensos. Sin embargo, al momento de responder, el modelo generador necesita el contexto circundante amplio para comprender el flujo temático y las dependencias lógicas.',
          'En el patrón Parent-Child, dividimos el documento en bloques padre de 600 a 800 tokens, y cada bloque padre se subdivide en múltiples fragmentos hijos de 120 tokens. Los embeddings vectoriales se calculan y se indexan únicamente sobre los nodos hijos. Cuando una consulta de usuario encuentra una coincidencia con uno o más nodos hijos, el motor de recuperación no inyecta los fragmentos pequeños al LLM, sino que asciende en el grafo y recupera el nodo padre correspondiente. De este modo, la precisión en la búsqueda vectorial es milimétrica, mientras que la continuidad contextual para la generación es óptima.',
          'Complementando este diseño, integramos la búsqueda híbrida unificada. La búsqueda léxica dispersa (Sparse Search basada en algoritmos BM25 o SPLADE) se ejecuta en paralelo con la búsqueda semántica densa (Dense Embeddings). La fusión de ambos conjuntos de resultados se lleva a cabo mediante Reciprocal Rank Fusion (RRF), un algoritmo probabilístico que asigna puntuaciones ponderadas en función del orden de llegada en ambas listas sin verse afectado por diferencias en las escalas de distancia.'
        ],
        table: {
          headers: ['Estrategia de Indexación', 'Precisión Top-3', 'Latencia p95', 'Costo por 100k Consultas', 'Tasa de Alucinación'],
          rows: [
            ['Naive Chunking (500 tokens fijos)', '64.2%', '110 ms', '$12.50 USD', '18.4%'],
            ['Semantic Splitters + Similitud Coseno', '76.8%', '165 ms', '$18.20 USD', '11.2%'],
            ['Parent-Child + Hybrid BM25/Vector', '89.4%', '195 ms', '$14.10 USD', '4.8%'],
            ['Hybrid + Cohere/BGE Reranker Grande', '94.2%', '245 ms', '$16.80 USD', '1.2%']
          ]
        }
      },
      {
        id: 'implementacion-cross-encoder-reranking',
        title: '3. Implementación de Reranking con Cross-Encoders y Métricas NDCG',
        paragraphs: [
          'La etapa final de un pipeline de recuperación de nivel corporativo es el reordenamiento estricto (Reranking). Mientras que los modelos de embeddings operan como bi-encoders (evaluando la consulta y el fragmento de forma aislada para proyectarlos a un espacio vectorial), los cross-encoders procesan simultáneamente la consulta y el fragmento a través de capas de atención cruzada completa, calculando un coeficiente de relevancia semántica sin concesiones de compresión.',
          'A continuación se presenta la implementación de referencia en Python utilizando modelos cross-encoders de última generación, incorporando deduplicación contextual y normalización de puntuación:'
        ],
        codeBlock: {
          language: 'python',
          caption: 'Pipeline de reranking híbrido con deduplicación y compresión de contexto en Python',
          code: `from sentence_transformers import CrossEncoder
from typing import List, Dict
import numpy as np

# Inicialización del modelo cross-encoder optimizado para inferencia en CPU/GPU
reranker = CrossEncoder('BAAI/bge-reranker-large', max_length=512)

def rerank_and_filter_documents(
    query: str, 
    retrieved_candidates: List[Dict], 
    top_k: int = 4, 
    min_score_threshold: float = 0.45
) -> List[Dict]:
    """
    Evalua pares de consulta y fragmento para reordenar por relevancia estricta
    y descartar aquellos que no superen el umbral minimo de confianza.
    """
    if not retrieved_candidates:
        return []

    # Construccion de pares para evaluacion cruzada simultanea
    pairs = [[query, doc["content"]] for doc in retrieved_candidates]
    raw_scores = reranker.predict(pairs)
    
    # Aplicacion de funcion sigmoide para normalizar puntuaciones entre 0 y 1
    normalized_scores = 1 / (1 + np.exp(-raw_scores))
    
    scored_docs = []
    for idx, doc in enumerate(retrieved_candidates):
        score = float(normalized_scores[idx])
        if score >= min_score_threshold:
            doc_copy = doc.copy()
            doc_copy["relevance_score"] = round(score, 4)
            scored_docs.append(doc_copy)
            
    # Ordenamiento descendente por puntuacion de relevancia
    ranked_docs = sorted(scored_docs, key=lambda x: x["relevance_score"], reverse=True)
    return ranked_docs[:top_k]`
        }
      },
      {
        id: 'optimizacion-costos-y-latencia',
        title: '4. Optimización de Costos, Compresión de Contexto y Latencia',
        paragraphs: [
          'Uno de los errores más costosos en infraestructuras de IA es saturar el prompt del modelo generador con texto irrelevante o repetitivo. Si cada consulta inyecta 4.000 tokens de contexto recuperado cuando solo se requerían 1.200 tokens clave, los costos de inferencia se multiplican por cuatro y la latencia del primer token (Time to First Token - TTFT) se degrada sustancialmente.',
          'Para mitigar este sobrecosto, aplicamos dos técnicas sinérgicas: enrutamiento semántico previo (Semantic Routing) y compresión extractiva de fragmentos. El enrutamiento semántico analiza la intención del usuario antes de tocar la base de datos vectorial; si la consulta es una aclaración conversacional o una pregunta genérica fuera de dominio, se canaliza directamente hacia respuestas cacheadas o directrices estándar sin incurrir en lecturas a disco.',
          'Por su parte, la compresión de contexto extractiva utiliza clasificadores de relevancia de oraciones para podar saludos, firmas legales y encabezados repetidos dentro de los fragmentos recuperados. Esto permite presentarle al modelo un contexto ultra concentrado que maximiza la capacidad de razonamiento y reduce la latencia de respuesta global por debajo de los 600 milisegundos.'
        ]
      },
      {
        id: 'antipatrones-y-lecciones-en-produccion',
        title: '5. Antipatrones Críticos a Evitar en Sistemas RAG',
        paragraphs: [
          'Durante múltiples auditorías de ingeniería en 4kt, hemos identificado patrones recurrentes que degradan silenciosamente la confiabilidad de los sistemas de recuperación:',
          '1. Confiar ciegamente en distancias euclidianas sin normalización de embeddings: Si los vectores no están normalizados en norma unitaria, la distancia euclidiana L2 introduce sesgos graves hacia documentos más largos o con mayor densidad de términos.',
          '2. Reindexar toda la base vectorial ante pequeñas modificaciones de documentos: Un sistema productivo debe admitir actualización incremental de vectores mediante hash criptográfico (SHA-256) del contenido para reindexar únicamente los párrafos alterados.',
          '3. Omitir el filtrado estricto por permisos de usuario (Multi-tenancy RAG): Los metadatos de control de acceso basados en roles (RBAC) deben validarse a nivel del motor vectorial antes de la búsqueda para evitar fugas de información confidencial entre departamentos.'
        ]
      },
      {
        id: 'conclusiones-checklist-andres-martinez',
        title: '6. Conclusión y Checklist de Auditoría de Andrés Martínez',
        paragraphs: [
          'La arquitectura RAG ha madurado de ser un truco de demostración con LangChain a una disciplina rigurosa de ingeniería de datos y recuperación de información. El éxito en producción reside en la limpieza de los datos ingeridos, el modelado jerárquico de documentos y la incorporación de filtros léxicos y cross-encoders.',
          'Antes de dar por finalizada la puesta en marcha de tu sistema RAG, verifica esta lista de comprobación técnica en 4kt: ¿Cuentas con búsqueda híbrida BM25 + Dense? ¿Implementas evaluación continua con conjuntos de prueba y métricas NDCG? ¿Filtras metadatos en memoria antes de calcular distancias vectoriales? Si cumples estos requisitos, tu plataforma ofrecerá respuestas con menos del 1% de margen de alucinación.'
        ]
      }
    ]
  }
];

console.log("Base dataset initialized");
