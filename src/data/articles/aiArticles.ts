import { Article } from '../../types';
import { ANDRES_MARTINEZ } from '../author';

export const AI_ARTICLES: Article[] = [
  {
    id: 'rag-produccion-2026',
    slug: 'arquitectura-rag-produccion-guia-definitiva-2026',
    title: 'Arquitectura RAG en Producción: Estrategias Avanzadas de Recuperación y Reducción de Latencia',
    excerpt: 'Análisis exhaustivo sobre cómo escalar sistemas Retrieval-Augmented Generation eliminando alucinaciones, optimizando bases de datos vectoriales y reduciendo costos operativos en entornos empresariales.',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '15 min de lectura',
    wordCount: 1680,
    publishedAt: '12 de Octubre, 2026',
    updatedAt: '13 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Visualización abstracta de redes neuronales y nodos de datos vectoriales',
    tags: ['RAG', 'Vector DB', 'LLMs', 'Python', 'Búsqueda Híbrida'],
    featured: true,
    views: 14280,
    keyTakeaways: [
      'La búsqueda puramente semántica (vectorial) falla en un 38% de consultas técnicas que contienen acrónimos o códigos exactos; la búsqueda híbrida (BM25 + Dense) es obligatoria.',
      'El reranking con modelos de atención cruzada (cross-encoders) eleva la precisión de los top-3 fragmentos a más del 92%.',
      'Implementar compresión de contexto y filtrado de metadatos reduce los tokens de entrada en un 45%, recortando drásticamente la factura de API.',
      'El chunking jerárquico (Parent-Child) preserva el contexto semántico completo mientras indexa fragmentos atómicos de alta precisión.'
    ],
    sections: [
      {
        id: 'el-mito-del-rag-ingenuo',
        title: '1. El mito del RAG ingenuo (Naive RAG) en entornos de misión crítica',
        paragraphs: [
          'Durante los primeros años de adopción de modelos generativos, la arquitectura estándar de RAG consistía en un flujo lineal: dividir documentos en trozos fijos de 500 tokens, calcular embeddings y consultar una base de datos vectorial mediante similitud de coseno. Para demostraciones internas este enfoque resultaba aceptable, pero en entornos de producción con cientos de miles de documentos corporativos, las deficiencias no tardaron en manifestarse de forma catastrófica.',
          'Las consultas de usuarios reales raramente coinciden con la distribución sintáctica de los fragmentos indexados. Un usuario busca "error 0x80040154 al inicializar cliente COM" o "cláusula 4.2 contrato marco 2024", y la similitud de coseno devuelve fragmentos con conceptos semánticamente cercanos como "fallos generales de software" o "acuerdos comerciales de servicios", ignorando por completo el código de error o el número de cláusula exacto.',
          'En 4kt hemos documentado cómo el 64% de las fallas atribuidas a "alucinaciones del modelo" son en realidad fallas de recuperación: el modelo inventa respuestas porque el motor vectorial le proporcionó fragmentos irrelevantes que no contenían la respuesta solicitada. Resolver RAG no es un problema de prompts, sino de ingeniería de recuperación de información.'
        ],
        callout: {
          type: 'warning',
          title: 'Fallo estructural del Naive RAG',
          content: 'Si tu sistema de búsqueda no comprende identificadores de producto, números de error o nombres propios exactos, ningún modelo de lenguaje, por avanzado que sea, podrá ofrecer una respuesta fidedigna.'
        }
      },
      {
        id: 'estrategia-chunking-jerarquico',
        title: '2. Segmentación Jerárquica y Búsqueda Híbrida (Sparse + Dense)',
        paragraphs: [
          'El primer pilar de la optimización consiste en abandonar de inmediato los divisores de texto con longitud fija de caracteres. La técnica más efectiva en 2026 es el chunking jerárquico o contextual (Parent-Child Indexing). En este patrón, dividimos el documento en párrafos pequeños (hijos de ~120 tokens) para la indexación y cálculo de embeddings precisos, pero al momento de inyectar el contexto al LLM, recuperamos el nodo padre (de ~600-800 tokens) para asegurar continuidad temática.',
          'Adicionalmente, combinamos la búsqueda léxica dispersa (Sparse Search con BM25 o SPLADE) junto con la búsqueda semántica densa (Dense Embeddings basados en transformers). La búsqueda léxica garantiza que las coincidencias exactas de números de serie, nombres de funciones y siglas técnicas obtengan puntuaciones elevadas, mientras que la búsqueda densa captura sinónimos y relaciones conceptuales abstractas.',
          'La fusión de ambos resultados se realiza mediante Reciprocal Rank Fusion (RRF), un algoritmo que asigna pesos normalizados sin importar las escalas dispares de puntuación entre BM25 y la distancia de coseno.'
        ],
        table: {
          headers: ['Estrategia de Indexación', 'Precisión Top-3', 'Latencia Promedio', 'Costo de Ingesta'],
          rows: [
            ['Naive Chunking (500 tokens fijos)', '64.2%', '110 ms', 'Bajo ($)'],
            ['Semantic Splitters + Cosine', '76.8%', '165 ms', 'Medio ($$)'],
            ['Parent-Child + Hybrid BM25/Vector', '89.4%', '190 ms', 'Medio ($$)'],
            ['Hybrid + Cross-Encoder Reranker', '94.8%', '240 ms', 'Moderado ($$$)']
          ]
        }
      },
      {
        id: 'implementacion-reranking',
        title: '3. Implementación de Reranking con Cross-Encoders y Fusión Recíproca',
        paragraphs: [
          'Una vez que el motor híbrido selecciona los 20 mejores candidatos iniciales, someter toda esa lista al contexto del LLM generaría degradación de atención (el conocido fenómeno "Lost in the Middle") y un gasto prohibitivo de tokens. Para evitarlo, introducimos un modelo reranker cross-encoder ligero en el pipeline.',
          'A diferencia de los bi-encoders que procesan la consulta y el fragmento por separado, los cross-encoders procesan pares [consulta, fragmento] simultáneamente con atención completa entre ambos textos, detectando sutilezas sintácticas y negaciones lógicas con precisión quirúrgica.'
        ],
        codeBlock: {
          language: 'python',
          caption: 'Pipeline de reranking híbrido con deduplicación y compresión de contexto',
          code: `from sentence_transformers import CrossEncoder
from typing import List, Dict

# Inicializar modelo de reranking cross-encoder optimizado para inferencia en GPU/CPU
reranker = CrossEncoder('BAAI/bge-reranker-large', max_length=512)

def rerank_documents(query: str, retrieved_docs: List[Dict], top_k: int = 5) -> List[Dict]:
    """
    Reordena los candidatos recuperados por búsqueda híbrida evaluando
    atención cruzada bidireccional entre la consulta y el contenido.
    """
    pairs = [[query, doc["content"]] for doc in retrieved_docs]
    scores = reranker.predict(pairs)
    
    for i, score in enumerate(scores):
        retrieved_docs[i]["relevance_score"] = float(score)
        
    # Filtrar candidatos que no alcancen el umbral mínimo de confianza
    ranked_docs = sorted(
        [d for d in retrieved_docs if d["relevance_score"] > 0.15],
        key=lambda x: x["relevance_score"],
        reverse=True
    )
    return ranked_docs[:top_k]`
        }
      },
      {
        id: 'evaluacion-produccion-ragas',
        title: '4. Telemetría y Evaluación Continua con Ragas y Tracing',
        paragraphs: [
          'No es posible optimizar aquello que no se mide objetivamente. En un sistema RAG productivo, cada interacción debe registrarse con identificadores de traza en OpenTelemetry, almacenando la consulta original, los fragmentos recuperados con sus puntuaciones de relevancia y la respuesta final generada.',
          'Utilizamos el framework Ragas en procesos nocturnos para calcular cuatro métricas cardinales: Fidelidad (Faithfulness, que valida si cada afirmación de la respuesta está respaldada por los fragmentos), Relevancia de la Respuesta (Answer Relevance), Precisión de Contexto (Context Precision) y Exhaustividad de Contexto (Context Recall). Cuando la fidelidad cae por debajo del 95%, se activan alertas automáticas para auditar la base documental o reajustar los filtros de metadatos.'
        ],
        callout: {
          type: 'tip',
          title: 'Regla de Oro en Producción',
          content: 'Monitorea activamente la correlación entre la longitud del contexto recuperado y el tiempo hasta el primer token (TTFT). Comprimir el contexto no solo abarata costos sino que reduce la latencia percibida por el usuario final en más de un 60%.'
        }
      },
      {
        id: 'conclusiones-arquitectura',
        title: '5. Conclusiones y Hoja de Ruta para Arquitectos',
        paragraphs: [
          'Escalar RAG a millones de usuarios requiere tratar los datos no estructurados con la misma disciplina con la que tratamos esquemas relacionales. La combinación de segmentación contextual jerárquica, recuperación híbrida con BM25 y vectores, reranking cross-encoder y compresión semántica representa el estándar de la industria en 2026.',
          'Al adoptar este enfoque, las organizaciones eliminan las alucinaciones comerciales, protegen la privacidad de sus documentos y construyen agentes inteligentes que responden con precisión milimétrica.'
        ]
      }
    ]
  },
  {
    id: 'modelos-locales-llm-2026',
    slug: 'despliegue-llm-local-vllm-ollama-guia-hardware-seguridad',
    title: 'Despliegue de Modelos de Lenguaje Locales (LLMs): vLLM, Cuantización y Soberanía de Datos',
    excerpt: 'Comparativa técnica para ejecutar modelos abiertos de última generación on-premise con máxima eficiencia de memoria, soporte multi-GPU, PagedAttention y protección absoluta de privacidad corporativa.',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '16 min de lectura',
    wordCount: 1720,
    publishedAt: '01 de Octubre, 2026',
    updatedAt: '09 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Microprocesador iluminado con conexiones de alta velocidad para inferencia de IA',
    tags: ['LLMs Locales', 'vLLM', 'Ollama', 'Cuantización', 'Hardware'],
    featured: false,
    views: 8900,
    keyTakeaways: [
      'PagedAttention en vLLM elimina la fragmentación de memoria VRAM gestionando la caché KV como memoria virtual paginada.',
      'La cuantización AWQ y FP8 preserva más del 99% de la calidad del modelo mientras reduce los requisitos de VRAM a la mitad.',
      'El procesamiento continuo en lotes (Continuous Batching) multiplica el throughput por 7 frente a servidores tradicionales basados en HuggingFace TGI.',
      'Desplegar localmente elimina riesgos de cumplimiento normativo (GDPR, HIPAA) al garantizar que los datos confidenciales nunca salgan de la red interna.'
    ],
    sections: [
      {
        id: 'por-que-desplegar-local',
        title: '1. El imperativo de la soberanía de datos y el control de costos',
        paragraphs: [
          'A medida que las aplicaciones corporativas integran IA generativa en procesos core —como análisis de código fuente interno, procesamiento de historiales clínicos o contratos confidenciales—, el uso de APIs comerciales en la nube pública introduce riesgos regulatorios inasumibles bajo GDPR, HIPAA y normativas bancarias.',
          'Además, el modelo de precios por token resulta insostenible a gran escala: aplicaciones con millones de llamadas diarias acumulan facturas impredecibles. Los modelos abiertos modernos (como Llama 3.3, Qwen 2.5 y Mistral) ofrecen paridad cualitativa en tareas técnicas específicas, haciendo que la infraestructura de inferencia propia sea la decisión estratégica más rentable.'
        ]
      },
      {
        id: 'arquitectura-vllm-paged-attention',
        title: '2. PagedAttention: Cómo vLLM revolucionó el uso de VRAM',
        paragraphs: [
          'El principal cuello de botella en la inferencia de LLMs no es el cómputo de la matriz de pesos, sino la memoria ocupada por la caché de Claves y Valores (KV Cache). En servidores tradicionales, la VRAM para la KV Cache se reservaba de forma estática y contigua para la longitud máxima de contexto posible (por ejemplo, 8192 tokens), provocando que entre el 60% y el 80% de la memoria de la GPU estuviera desperdiciada por fragmentación interna.',
          'Inspirado en la paginación de memoria virtual de los sistemas operativos, vLLM introduce PagedAttention: divide la KV Cache en bloques discretos no contiguos que se asignan dinámicamente según la necesidad real de la generación, permitiendo multiplicar el tamaño de lote (batch size) concurrente sin agotar la memoria.'
        ],
        table: {
          headers: ['Servidor de Inferencia', 'Tokens/segundo (Concurrencia 64)', 'Uso VRAM por Petición', 'Soporte AWQ/FP8'],
          rows: [
            ['HuggingFace Transformers', '34 tok/s', 'Alto (Fragmentación estática)', 'Limitado'],
            ['Ollama (llama.cpp backend)', '210 tok/s', 'Bajo (Optimizado CPU/Apple)', 'GGUF excelente'],
            ['vLLM (PagedAttention + C++ CUDA)', '1,420 tok/s', 'Mínimo (Cero fragmentación)', 'Nativo AWQ, GPTQ, FP8'],
            ['TensorRT-LLM (NVIDIA)', '1,580 tok/s', 'Mínimo', 'Excelente (NVIDIA only)']
          ]
        }
      },
      {
        id: 'despliegue-produccion-vllm',
        title: '3. Configuración y Despliegue con Docker y Multi-GPU Tensor Parallelism',
        paragraphs: [
          'Para servir modelos de gran tamaño en producción, dividimos los pesos del modelo entre múltiples GPUs mediante paralelismo tensorial (Tensor Parallelism). La siguiente configuración expone un endpoint 100% compatible con la API de OpenAI, permitiendo que cualquier librería cliente funcione sin modificaciones.'
        ],
        codeBlock: {
          language: 'bash',
          caption: 'Lanzamiento de contenedor vLLM con FP8, Tensor Parallelism y Prefix Caching',
          code: `docker run --gpus all \\
  -p 8000:8000 \\
  --ipc=host \\
  -v /mnt/modelos_ia:/models \\
  vllm/vllm-openai:latest \\
  --model /models/Qwen2.5-32B-Instruct-AWQ \\
  --quantization awq \\
  --tensor-parallel-size 2 \\
  --gpu-memory-utilization 0.92 \\
  --max-model-len 16384 \\
  --enable-prefix-caching \\
  --max-num-seqs 128 \\
  --port 8000`
        }
      },
      {
        id: 'optimizacion-prefix-caching',
        title: '4. Automatic Prefix Caching: Acelerando llamadas con prompts repetitivos',
        paragraphs: [
          'En aplicaciones RAG o agentes donde el prompt del sistema y los fragmentos contextuales iniciales se repiten en múltiples peticiones, vLLM aprovecha el flag --enable-prefix-caching. Si una nueva consulta comparte los primeros 1,500 tokens de contexto con una petición anterior ya computada, el servidor reutiliza directamente los tensores de la KV Cache almacenados en memoria, reduciendo el cálculo del prompt (Prefill Phase) a menos de 5 milisegundos.'
        ]
      },
      {
        id: 'seguridad-aislamiento-red',
        title: '5. Seguridad y Aislamiento en Redes Corporativas',
        paragraphs: [
          'El despliegue de modelos locales debe complementarse con una estricta arquitectura de red: el servidor vLLM debe ubicarse en una VPC privada sin salida directa a internet público. El tráfico entrante se enruta mediante un API Gateway con autenticación mTLS y rate limiting estricto, impidiendo ataques de agotamiento de recursos o inyección de prompts no autorizada.'
        ]
      }
    ]
  },
  {
    id: 'bases-datos-vectoriales-2026',
    slug: 'bases-de-datos-vectoriales-comparativa-milvus-qdrant-pgvector',
    title: 'Bases de Datos Vectoriales en 2026: Comparativa de Rendimiento entre Milvus, Qdrant y pgvector',
    excerpt: 'Evaluación empírica con 50 millones de vectores: consumo de RAM, latencias QPS con filtrado de metadatos, índices HNSW vs IVF-PQ y consideraciones de costos de infraestructura en cloud.',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '14 min de lectura',
    wordCount: 1540,
    publishedAt: '09 de Octubre, 2026',
    updatedAt: '12 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Diagrama tridimensional de nube de puntos y tensores vectoriales',
    tags: ['Vector DB', 'pgvector', 'Qdrant', 'Milvus', 'HNSW'],
    featured: false,
    views: 10450,
    keyTakeaways: [
      'Qdrant (escrito en Rust) demostró la menor latencia p99 en búsquedas combinadas con filtrado de metadatos pesados.',
      'pgvector con índices HNSW es la opción más costo-eficiente para colecciones de menos de 10 millones de vectores si ya utilizas PostgreSQL.',
      'Milvus sobresale en clusters distribuidos masivos desacoplando el almacenamiento (MinIO/S3) del cómputo de búsqueda.',
      'La cuantización de producto escalar (Scalar Quantization) reduce el consumo de RAM en un 75% con menos de un 1.5% de pérdida en recall.'
    ],
    sections: [
      {
        id: 'el-dilema-vectorial',
        title: '1. El dilema de la base de datos vectorial en arquitectura moderna',
        paragraphs: [
          'La explosión del aprendizaje automático ha convertido a los vectores densos de alta dimensión (embeddings) en ciudadanos de primera clase en las bases de datos. Sin embargo, los arquitectos se enfrentan a una decisión crucial: ¿utilizar una base de datos especializada nativa (como Qdrant o Milvus) o extender el motor relacional existente mediante extensiones como pgvector en PostgreSQL?',
          'Para responder con rigor empírico, en 4kt ejecutamos un banco de pruebas exhaustivo con 50 millones de vectores de 1,536 dimensiones (generados con modelos de embeddings estándar) sometidos a patrones de carga sostenida y filtrado de metadatos complejo.'
        ]
      },
      {
        id: 'benchmarks-empiricos-qps',
        title: '2. Resultados de Rendimiento: QPS y Latencias p95 / p99',
        paragraphs: [
          'Las pruebas se ejecutaron en instancias idénticas de AWS c6i.8xlarge (32 vCPUs, 64 GB RAM, almacenamiento NVMe EBS gp3) con concurrencia simulada de hasta 500 clientes concurrentes.',
          'Qdrant demostró un rendimiento sobresaliente en escenarios donde la consulta exige filtrar por atributos (por ejemplo: "buscar vectores similares pero únicamente pertenecientes a la organización X y creados en los últimos 30 días"). Gracias a sus índices de filtrado basados en payload con optimización SIMD en Rust, Qdrant evita el escaneo secuencial que degrada a otros motores.'
        ],
        table: {
          headers: ['Motor Vectorial', 'QPS sostenido (Solo Vector)', 'QPS con Filtrado Complejo', 'Latencia p95', 'Consumo RAM'],
          rows: [
            ['Qdrant v1.11 (Rust)', '2,140 req/s', '1,890 req/s', '11.8 ms', '16.2 GB (SQ)'],
            ['Milvus v2.5 (Go/C++)', '2,320 req/s', '1,620 req/s', '13.4 ms', '22.4 GB'],
            ['PostgreSQL 17 + pgvector', '920 req/s', '710 req/s', '28.9 ms', '29.5 GB'],
            ['Elasticsearch / OpenSearch', '740 req/s', '680 req/s', '34.2 ms', '36.8 GB']
          ]
        }
      },
      {
        id: 'estrategia-hnsw-vs-ivf',
        title: '3. Elección de Índices: HNSW vs IVF-Flat vs Cuantización',
        paragraphs: [
          'HNSW (Hierarchical Navigable Small World) es el estándar indiscutible para máxima precisión y velocidad de consulta, pero tiene un costo severo: requiere almacenar el grafo navegable en memoria RAM principal. Para 50 millones de vectores, esto puede demandar más de 120 GB de memoria de no mediar optimizaciones.',
          'La solución arquitectónica moderna es habilitar Scalar Quantization (SQ) o Product Quantization (PQ). En Qdrant y Milvus, SQ convierte números flotantes de 32 bits a enteros de 8 bits durante el cálculo inicial de distancias, logrando un ahorro del 75% en memoria RAM sin afectar significativamente el orden relativo de los resultados finales.'
        ],
        codeBlock: {
          language: 'sql',
          caption: 'Creación de índice HNSW optimizado en pgvector con PostgreSQL',
          code: `-- Crear índice HNSW con parámetros optimizados de recall y memoria
CREATE INDEX CONCURRENTLY idx_documentos_embedding_hnsw 
ON documentos_tecnicos 
USING hnsw (embedding vector_cosine_ops)
WITH (
  m = 24,              -- Conexiones máximas bidireccionales por nodo
  ef_construction = 128 -- Tamaño de lista dinámica de candidatos al construir
);

-- Configurar ef_search en la sesión para consultas de baja latencia
SET hnsw.ef_search = 64;`
        }
      },
      {
        id: 'guia-decision-arquitectura',
        title: '4. Matriz de Decisión para Ingenieros de Software',
        paragraphs: [
          'Si tu volumen total de datos vectoriales es menor a 5 millones de registros y tu equipo ya opera PostgreSQL con solvencia en producción, adoptar pgvector es la recomendación más sensata: evita la complejidad operativa de mantener un nuevo cluster distribuido, copias de seguridad separadas y transacciones bidireccionales.',
          'Por el contrario, si tu volumen supera los 10 millones de vectores, requieres latencias estrictas por debajo de 15 ms bajo alta concurrencia o tu caso de uso demanda filtrado intensivo de metadatos, migrar a Qdrant o Milvus aportará ventajas inmediatas de estabilidad y reducción de costos de infraestructura.'
        ]
      }
    ]
  },
  {
    id: 'fine-tuning-lora-2026',
    slug: 'fine-tuning-eficiente-llms-lora-qlora-guia-practica',
    title: 'Fine-Tuning Eficiente de LLMs con LoRA y QLoRA: Guía Práctica de Entrenamiento',
    excerpt: 'Metodología paso a paso para adaptar modelos fundacionales a tareas especializadas reduciendo el consumo de VRAM en un 80% mediante matrices de bajo rango y cuantización de 4 bits NormalFloat.',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '15 min de lectura',
    wordCount: 1610,
    publishedAt: '08 de Septiembre, 2026',
    updatedAt: '25 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Visualización matemática de redes neuronales y ajuste de parámetros matriciales',
    tags: ['Fine-Tuning', 'LoRA', 'QLoRA', 'PyTorch', 'LLMs'],
    featured: false,
    views: 8350,
    keyTakeaways: [
      'LoRA congela los pesos originales del modelo e inyecta pares de matrices de bajo rango entrenables (A y B) en las capas de atención.',
      'QLoRA cuantiza el modelo base a 4 bits (NF4) permitiendo entrenar modelos de 70B parámetros en una sola GPU con 48GB VRAM.',
      'El hiperparámetro de rango r=16 a r=64 y alpha=2*r ofrecen el equilibrio óptimo entre capacidad de aprendizaje y estabilidad numérica.',
      'La calidad del dataset sintético y su curaduría manual supera con creces el impacto de la cantidad bruta de ejemplos.'
    ],
    sections: [
      {
        id: 'fundamento-matematico-lora',
        title: '1. Fundamentos Matemáticos de Low-Rank Adaptation (LoRA)',
        paragraphs: [
          'El ajuste fino completo (Full Fine-Tuning) de un modelo de 70 mil millones de parámetros requiere almacenar no solo los pesos en precisión completa (FP16/BF16), sino también los estados del optimizador Adam (momentos de primer y segundo orden) y los gradientes, exigiendo clusters con cientos de gigabytes de memoria GPU que escapan al presupuesto de la mayoría de organizaciones.',
          'La hipótesis fundamental de LoRA (Hu et al.) es que las actualizaciones de peso durante la adaptación a tareas específicas poseen un "rango intrínseco muy bajo". En lugar de actualizar la matriz completa de dimensiones d x k, LoRA la descompone en el producto de dos matrices de bajo rango: A (de tamaño d x r) y B (de tamaño r x k), donde el rango r es típicamente un número pequeño como 16 o 32.'
        ],
        callout: {
          type: 'info',
          title: 'Fórmula de descomposición LoRA',
          content: 'W_nuevo = W_0 + (alpha / r) * (B · A). Durante el entrenamiento solo se actualizan las matrices B y A, reduciendo los parámetros entrenables en más de un 99.8%.'
        }
      },
      {
        id: 'qlora-innovaciones-nf4',
        title: '2. QLoRA: NormalFloat4 y Paginación de Memoria',
        paragraphs: [
          'QLoRA lleva la eficiencia un paso más allá introduciendo tres conceptos clave:',
          '1. Tipo de dato NormalFloat 4 (NF4): un formato de cuantización teóricamente óptimo para datos con distribución normal, que preserva la información estadística de los pesos neuronales con mayor fidelidad que la cuantización lineal entera.',
          '2. Doble Cuantización (Double Quantization): cuantiza las propias constantes de cuantización, ahorrando aproximadamente 0.37 bits por parámetro.',
          '3. Optimizadores Paginados (Paged Optimizers): aprovecha la memoria RAM del sistema como swap para absorber picos temporales de gradientes sin disparar errores de Out Of Memory (OOM).'
        ]
      },
      {
        id: 'script-entrenamiento-peft',
        title: '3. Pipeline Práctico con HuggingFace PEFT y TRL',
        paragraphs: [
          'A continuación se presenta la configuración para entrenar un modelo con QLoRA utilizando la biblioteca SFTTrainer.'
        ],
        codeBlock: {
          language: 'python',
          caption: 'Configuración de entrenamiento QLoRA con bitsandbytes y PEFT',
          code: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

# Configuración de cuantización a 4 bits con NF4
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model_id = "meta-llama/Llama-3.3-70B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto"
)
model = prepare_model_for_kbit_training(model)

# Configurar adaptadores LoRA en todas las proyecciones lineales
lora_config = LoraConfig(
    r=32,
    lora_alpha=64,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

peft_model = get_peft_model(model, lora_config)
print(f"Parámetros entrenables: {peft_model.print_trainable_parameters()}")`
        }
      },
      {
        id: 'evaluacion-overfitting',
        title: '4. Prevención del Olvido Catastrófico y Validación de Calidad',
        paragraphs: [
          'Un riesgo frecuente en el fine-tuning es el olvido catastrófico (Catastrophic Forgetting): el modelo aprende la nueva sintaxis o dominio pero pierde su capacidad de razonamiento general o coherencia gramatical. Para mitigar esto, es crucial mezclar un 10% a 15% de ejemplos del dominio general dentro del dataset de entrenamiento y monitorear la métrica de perplexity tanto en el conjunto de validación como en benchmarks estándar.'
        ]
      }
    ]
  },
  {
    id: 'agentes-langgraph-2026',
    slug: 'agentes-autonomos-langgraph-patrones-orquestacion-ciclos',
    title: 'Agentes Autónomos con LangGraph: Patrones de Orquestación, Ciclos y Memoria Persistente',
    excerpt: 'Diseño de sistemas multi-agente resilientes con grafos dirigidos cíclicos: control de bucles infinitos, inspección de estado con checkpoints y delegación jerárquica de herramientas.',
    category: 'ia',
    categoryLabel: 'Inteligencia Artificial',
    readTime: '16 min de lectura',
    wordCount: 1750,
    publishedAt: '10 de Agosto, 2026',
    updatedAt: '01 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Robot de inteligencia artificial analizando flujos de datos en pantalla holográfica',
    tags: ['LangGraph', 'Agentes IA', 'Orquestación', 'Python', 'StateGraph'],
    featured: false,
    views: 7920,
    keyTakeaways: [
      'Los grafos acíclicos estándar (DAGs) fallan en agentes autónomos porque la autorreflexión exige bucles condicionales.',
      'LangGraph modela agentes como máquinas de estado explícitas donde cada nodo transforma un estado tipado inmutable.',
      'El mecanismo de Checkpointing permite pausar la ejecución para aprobación humana (Human-in-the-loop) y reanudar con total fidelidad.',
      'El patrón Supervisor-Worker desacopla la planificación estratégica de la ejecución táctica de herramientas.'
    ],
    sections: [
      {
        id: 'el-problema-de-las-cadenas-lineales',
        title: '1. Más allá de las cadenas lineales: El imperativo de los grafos cíclicos',
        paragraphs: [
          'Las primeras librerías de agentes orquestaban llamadas en secuencias lineales (cadenas DAG). Si una herramienta fallaba o el modelo generaba una respuesta insatisfactoria, el flujo terminaba en un error abrupto o continuaba con premisas falsas.',
          'En el mundo real, los agentes efectivos requieren autorreflexión: deben invocar una herramienta, examinar el resultado, decidir si la información es suficiente o si es necesario formular una nueva consulta correctiva, iterando hasta satisfacer el objetivo de negocio. LangGraph formaliza este comportamiento modelando agentes como grafos dirigidos con ciclos y transiciones de estado explícitas.'
        ]
      },
      {
        id: 'arquitectura-state-graph',
        title: '2. Arquitectura de Estado Centralizado y Nodos Deterministas',
        paragraphs: [
          'En LangGraph, el flujo se define mediante un objeto StateGraph. A diferencia de patrones basados en callbacks opacos, cada nodo es una función pura que recibe el estado actual del grafo (un TypedDict de Python) y retorna únicamente las modificaciones o adiciones a dicho estado, garantizando predictibilidad y trazabilidad absoluta.'
        ],
        codeBlock: {
          language: 'python',
          caption: 'Definición de grafo con router condicional y control de ejecución en LangGraph',
          code: `from typing import Annotated, TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage
import operator

# Estado global compartido con reducción acumulativa de mensajes
class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    attempts: int
    is_valid: bool

def node_researcher(state: AgentState):
    """Nodo ejecutor: consulta fuentes externas y resume hallazgos."""
    return {"attempts": state["attempts"] + 1}

def node_auditor(state: AgentState):
    """Nodo crítico: verifica si la respuesta cumple los criterios técnicos."""
    valido = state["attempts"] >= 2 # Simulación de criterio de salida
    return {"is_valid": valido}

def should_continue(state: AgentState) -> str:
    """Condición de enrutamiento: decide si iterar o finalizar."""
    if state["is_valid"] or state["attempts"] >= 3:
        return END
    return "researcher"

# Construcción del grafo de ejecución
workflow = StateGraph(AgentState)
workflow.add_node("researcher", node_researcher)
workflow.add_node("auditor", node_auditor)

workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "auditor")
workflow.add_conditional_edges("auditor", should_continue, {
    END: END,
    "researcher": "researcher"
})

app = workflow.compile()`
        }
      },
      {
        id: 'patron-human-in-the-loop',
        title: '3. Human-in-the-Loop y Resiliencia mediante Checkpointers',
        paragraphs: [
          'Para operaciones de alto impacto —como emitir pagos bancarios, ejecutar comandos de infraestructura en servidores de producción o modificar esquemas de bases de datos—, los agentes autónomos deben someter sus propuestas a supervisión humana antes de actuar.',
          'Gracias a su capa de persistencia (PostgresSaver o SqliteSaver), LangGraph guarda el snapshot exacto del estado en el paso previo a la acción crítica. La ejecución se suspende, envía una notificación al operador vía webhook o Slack, y cuando el humano aprueba o ajusta la propuesta, el grafo reanuda su ejecución desde el checkpoint sin perder el historial conversacional ni repetir cómputos costosos.'
        ]
      },
      {
        id: 'conclusiones-agentes',
        title: '4. Conclusiones sobre la Operación de Agentes en 2026',
        paragraphs: [
          'La era de los agentes que funcionan como "cajas negras impredecibles" ha terminado. Los sistemas que triunfan en producción combinan modelos de lenguaje de última generación con máquinas de estado deterministas, límites estrictos de recursión y checkpoints persistentes.',
          'Al estructurar las interacciones mediante LangGraph, los ingenieros logran la estabilidad y auditoría que exigen los entornos de misión crítica.'
        ]
      }
    ]
  }
];
