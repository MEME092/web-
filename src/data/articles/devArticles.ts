import { Article } from '../../types';
import { ANDRES_MARTINEZ } from '../author';

export const DEV_ARTICLES: Article[] = [
  {
    id: 'monolito-a-microservicios-2026',
    slug: 'de-monolito-a-microservicios-event-driven-guia-arquitectura',
    title: 'De Monolito a Microservicios Event-Driven: Lecciones Reales y Errores Costosos',
    excerpt: 'Guía práctica para arquitectos de software sobre cómo descomponer sistemas heredados sin caer en el temido monolito distribuido, garantizando consistencia eventual, idempotencia y alta disponibilidad.',
    category: 'desarrollo',
    categoryLabel: 'Desarrollo de Software',
    readTime: '17 min de lectura',
    wordCount: 1810,
    publishedAt: '04 de Octubre, 2026',
    updatedAt: '10 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Servidores de centro de datos con cableado de fibra óptica estructurado',
    tags: ['Arquitectura', 'Microservicios', 'Kafka', 'Event-Driven', 'DevOps'],
    featured: true,
    views: 11950,
    keyTakeaways: [
      'Dividir una aplicación por entidades de base de datos en lugar de por límites contextuales (Bounded Contexts) genera acoplamiento extremo.',
      'El patrón Transactional Outbox resuelve de forma definitiva la falta de transacciones ACID distribuidas al publicar eventos a Kafka o RabbitMQ.',
      'Las consultas sincrónicas HTTP en cascada entre microservicios multiplican la latencia y reducen drásticamente la disponibilidad del sistema.',
      'La idempotencia en consumidores mediante claves de deduplicación es la única garantía real frente a entregas al menos una vez (at-least-once).'
    ],
    sections: [
      {
        id: 'la-trampa-del-monolito-distribuido',
        title: '1. La trampa del monolito distribuido: Por qué fallan las migraciones ingenuas',
        paragraphs: [
          'La promesa de los microservicios es legendaria: despliegues independientes, escalabilidad elástica y autonomía entre equipos de ingeniería. Sin embargo, en la práctica, un número alarmante de organizaciones que intentan migrar su monolito terminan construyendo la peor arquitectura concebible: el monolito distribuido.',
          'En un monolito tradicional, si el servicio de facturación necesita información del perfil de usuario, realiza una llamada a un método en memoria que toma 0.05 milisegundos. En un monolito distribuido mal diseñado, ese método se sustituye por una llamada HTTP síncrona a través de la red interna. Si para procesar una compra el servicio A debe llamar a B, B debe llamar a C y C a D, la disponibilidad del sistema deja de ser del 99.9% para convertirse en el producto de las disponibilidades individuales: 0.999^4 = 99.6%.',
          'En 4kt abogamos por un principio irrenunciable: los microservicios solo entregan valor real si son autónomos y se comunican de forma asíncrona a través de eventos inmutables.'
        ],
        callout: {
          type: 'warning',
          title: 'Regla de Acoplamiento',
          content: 'Si para desplegar una nueva versión del servicio de pagos necesitas coordinar el despliegue del servicio de inventario en la misma ventana de mantenimiento, no tienes microservicios: tienes un monolito fragmentado con latencia de red añadida.'
        }
      },
      {
        id: 'patron-transactional-outbox',
        title: '2. El Patrón Transactional Outbox: Consistencia Dual sin Transacciones Distribuidas',
        paragraphs: [
          'Uno de los dilemas más peligrosos al migrar a una arquitectura orientada a eventos es el problema del doble commit: una operación de negocio debe modificar la base de datos local y, al mismo tiempo, emitir un mensaje hacia el broker (como Apache Kafka o AWS SQS). Si la base de datos confirma el cambio pero la conexión de red al broker falla, el resto de servicios nunca sabrá del evento. Si publicas primero el evento y la transacción relacional falla por un conflicto de concurrencia, habrás notificado una mentira.',
          'El patrón Transactional Outbox soluciona esta contradicción de raíz aprovechando las transacciones ACID locales. En la misma transacción donde actualizamos la tabla de negocio (por ejemplo, "ordenes"), insertamos un registro en una tabla dedicada llamada "outbox_events". Posteriormente, un proceso de fondo desacoplado (utilizando Change Data Capture con Debezium o polling de alta velocidad) lee los eventos de la tabla outbox y los transmite al broker con reintentos garantizados.'
        ],
        codeBlock: {
          language: 'typescript',
          caption: 'Implementación del patrón Transactional Outbox con transacción relacional atómica',
          code: `import { db } from './database';
import { ordenes, outboxEventos } from './schema';

export interface NuevaOrdenInput {
  clienteId: string;
  totalMonto: number;
  items: Array<{ productoId: string; cantidad: number }>;
}

export async function registrarOrdenConOutbox(input: NuevaOrdenInput) {
  // Transacción ACID atómica en la base de datos primaria
  return await db.transaction(async (tx) => {
    // 1. Insertar la entidad principal de negocio
    const [ordenCreada] = await tx.insert(ordenes).values({
      clienteId: input.clienteId,
      monto: input.totalMonto,
      estado: 'PENDIENTE_PAGO',
      fechaCreacion: new Date()
    }).returning();

    // 2. Insertar el evento en la tabla Outbox dentro de la MISMA transacción
    await tx.insert(outboxEventos).values({
      agregadoId: ordenCreada.id,
      tipoEvento: 'OrdenRegistrada',
      payload: JSON.stringify({
        ordenId: ordenCreada.id,
        clienteId: input.clienteId,
        monto: input.totalMonto,
        items: input.items,
        timestamp: Date.now()
      }),
      estado: 'PENDIENTE',
      creadoEn: new Date()
    });

    return ordenCreada;
  });
}`
        }
      },
      {
        id: 'patron-saga-coreografiada',
        title: '3. Transacciones Distribuidas: Sagas Coreografiadas vs Orquestadas',
        paragraphs: [
          'Cuando un flujo comercial abarca múltiples límites contextuales —por ejemplo, reservar inventario, cobrar tarjeta de crédito y emitir factura fiscal—, los bloqueos distribuidos de dos fases (2PC) son inviables debido a su fragilidad y latencia. La solución probada en la industria es el patrón Saga.',
          'En una Saga Coreografiada, cada servicio reacciona autónomamente a los eventos de los demás y emite nuevos eventos en caso de éxito o eventos de compensación en caso de fallo. En una Saga Orquestada, un coordinador centralizado dirige los pasos secuenciales y ejecuta acciones de rollback compensatorio si alguna etapa se interrumpe.'
        ],
        table: {
          headers: ['Criterio de Evaluación', 'Saga Coreografiada', 'Saga Orquestada', 'Llamadas HTTP Síncronas'],
          rows: [
            ['Acoplamiento de Servicios', 'Mínimo (Solo conocen eventos)', 'Medio (Coordinador central)', 'Crítico (Acoplamiento directo)'],
            ['Visibilidad del Flujo', 'Compleja (Exige OpenTelemetry)', 'Excelente (El orquestador tiene el estado)', 'Pobre en errores parciales'],
            ['Resiliencia a Caídas', 'Muy Alta (Buffers en Broker)', 'Alta (Estado persistido en DB)', 'Muy Baja (Fallas en cascada)'],
            ['Recomendado Para', 'Flujos de 2 a 4 pasos simples', 'Flujos comerciales de 5+ pasos', 'Operaciones de lectura pura']
          ]
        }
      },
      {
        id: 'idempotencia-consumidores',
        title: '4. El Santo Grial de la Consistencia: Idempotencia en Consumidores',
        paragraphs: [
          'Todos los brokers de mensajería modernos operan bajo la semántica de entrega "at-least-once" (al menos una vez). Ante reinicios de pods o particiones de red, los mensajes duplicados son inevitables. Si tu consumidor procesa un pago de $100 dos veces, el error es imputable a tu diseño de software, no al broker.',
          'Diseñamos consumidores con claves de idempotencia obligatorias (Idempotency Key). Antes de ejecutar cualquier lógica con efectos secundarios, el consumidor comprueba si el identificador único del evento ya fue registrado en una caché distribuida o tabla de deduplicación con bloqueo optimista.'
        ]
      },
      {
        id: 'conclusiones-monolito',
        title: '5. Conclusiones y Filosofía de Arquitectura',
        paragraphs: [
          'Comenzar con un monolito modular bien estructurado suele ser la estrategia más inteligente para la inmensa mayoría de productos en fase inicial. La transición hacia microservicios debe ocurrir cuando la fricción organizativa de múltiples equipos tocando la misma base de código justifique el costo operacional de la asincronía y la observabilidad distribuida.'
        ]
      }
    ]
  },
  {
    id: 'core-web-vitals-rendimiento-2026',
    slug: 'optimizacion-core-web-vitals-rendimiento-web-2026',
    title: 'Optimización de Core Web Vitals en 2026: Dominando INP, LCP y CLS en Aplicaciones Modernas',
    excerpt: 'Estrategias probadas de renderizado, compresión y división de código para lograr puntajes perfectos de 100 en Lighthouse y cumplir holgadamente los estándares de Google.',
    category: 'desarrollo',
    categoryLabel: 'Desarrollo de Software',
    readTime: '15 min de lectura',
    wordCount: 1640,
    publishedAt: '08 de Octubre, 2026',
    updatedAt: '11 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Métricas analíticas de rendimiento de software y gráficos de velocidad web',
    tags: ['Rendimiento', 'SEO Técnico', 'Web Vitals', 'JavaScript', 'UX'],
    featured: false,
    views: 13200,
    keyTakeaways: [
      'Interaction to Next Paint (INP) reemplazó definitivamente a FID y exige dividir tareas largas de JS mediante scheduler.yield().',
      'Optimizar Largest Contentful Paint (LCP) requiere fetchpriority="high" en imágenes críticas y precargar fuentes WOFF2 con display: swap.',
      'Reservar dimensiones fijas (aspect-ratio) garantiza Cumulative Layout Shift (CLS) de 0.00 absoluto.',
      'El 70% de las degradaciones de rendimiento provienen de librerías de terceros y scripts de analítica no diferidos.'
    ],
    sections: [
      {
        id: 'la-revolucion-de-inp',
        title: '1. La revolución de INP (Interaction to Next Paint) y el fin de FID',
        paragraphs: [
          'Durante años, la métrica First Input Delay (FID) otorgaba una falsa sensación de velocidad: solo medía el retardo del primer clic del usuario durante la carga inicial. Si 10 segundos después el usuario abría un menú desplegable y la interfaz se congelaba durante 400 milisegundos debido a una hidratación tardía de JavaScript, FID marcaba verde.',
          'INP analiza la capacidad de respuesta de todas las interacciones a lo largo de la vida completa de la página. Para obtener una puntuación "Buena" según los estándares de Google, el percentil 75 de todas las interacciones debe responder visualmente en menos de 200 milisegundos. Lograr esto en aplicaciones SPA pesadas exige un replanteamiento profundo de la ejecución de JavaScript en el hilo principal.'
        ]
      },
      {
        id: 'scheduler-yield-microtareas',
        title: '2. Cediendo el Control Cooperativo con Scheduler.yield()',
        paragraphs: [
          'Cuando un script procesa una lista de 5,000 elementos en el navegador, el bucle bloquea el event loop. Si el usuario hace clic en un botón en medio del cálculo, el navegador no puede pintar el nuevo frame hasta que la tarea termine.',
          'La API moderna scheduler.yield() permite pausar voluntariamente la ejecución, dar oportunidad al navegador para atender pulsaciones táctiles y pintar frames, y reanudar inmediatamente el cálculo sin perder contexto.'
        ],
        codeBlock: {
          language: 'javascript',
          caption: 'División cooperativa de tareas pesadas en JavaScript con scheduler.yield()',
          code: `// Utilidad para ejecutar tareas largas sin congelar el hilo principal
async function procesarColeccionPesada(items, procesadorElemento) {
  for (let i = 0; i < items.length; i++) {
    procesadorElemento(items[i]);
    
    // Cada 50 iteraciones o cuando el hilo acumula más de 16ms de trabajo continuo
    if (i % 50 === 0) {
      if ('scheduler' in window && 'yield' in window.scheduler) {
        // Ceder el control al event loop nativo del navegador
        await window.scheduler.yield();
      } else {
        // Fallback para navegadores antiguos con microtareas de setTimeout
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }
}`
        }
      },
      {
        id: 'lcp-estrategias-recursos',
        title: '3. Optimizando LCP: Carga Prioritaria y Fuentes WOFF2',
        paragraphs: [
          'Largest Contentful Paint (LCP) mide cuándo se renderiza el bloque visual más grande visible en el viewport inicial (generalmente la imagen del hero banner o el título H1 principal). Para lograr un LCP inferior a 1.2 segundos:',
          '1. Asignar el atributo fetchpriority="high" y loading="eager" a la imagen principal, evitando que el navegador demore su descarga detrás de otros recursos.',
          '2. Preconectar y precargar fuentes tipográficas críticas con crossorigin en la cabecera HTML.',
          '3. Utilizar formatos de imagen de próxima generación (AVIF o WebP) con compresión optimizada.'
        ],
        table: {
          headers: ['Formato de Imagen', 'Peso Promedio Hero (1200x675)', 'Tiempo de Decodificación', 'Compatibilidad'],
          rows: [
            ['JPEG Tradicional', '280 KB', '14 ms', '100% universal'],
            ['WebP', '110 KB', '12 ms', '98% moderno'],
            ['AVIF (Máxima Compresión)', '68 KB', '18 ms', '94% navegadores actuales']
          ]
        }
      },
      {
        id: 'cls-cero-absoluto',
        title: '4. Eliminando el Desplazamiento Acumulativo (CLS = 0.00)',
        paragraphs: [
          'Nada frustra más a un lector que intentar pulsar un enlace y que la pantalla salte repentinamente porque una imagen o un espacio publicitario terminó de cargar sin dimensiones reservadas. En 4kt aplicamos la regla de reserva dimensional estricta: todo contenedor multimedia y espacio publicitario define explícitamente clases de aspecto de ratio fijo (aspect-video, min-h-[90px]) y overflow-hidden.'
        ]
      }
    ]
  },
  {
    id: 'concurrencia-go-2026',
    slug: 'concurrencia-rendimiento-golang-goroutines-canales-produccion',
    title: 'Concurrencia de Alto Rendimiento en Go: Goroutines y Canales sin Fugas de Memoria',
    excerpt: 'Estrategias de bajo nivel para procesar cientos de miles de peticiones por segundo en Go: control de Goroutines huérfanas, sync.Pool y perfiles de contención de mutex.',
    category: 'desarrollo',
    categoryLabel: 'Desarrollo de Software',
    readTime: '16 min de lectura',
    wordCount: 1710,
    publishedAt: '25 de Septiembre, 2026',
    updatedAt: '02 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Código de programación concurrente en pantalla de alta resolución',
    tags: ['Go', 'Golang', 'Concurrencia', 'Goroutines', 'Performance'],
    featured: false,
    views: 7420,
    keyTakeaways: [
      'Crear goroutines sin canales de cancelación (context.Context) es la principal causa de fugas de RAM en microservicios Go.',
      'sync.Pool reduce la presión sobre el recolector de basura (GC) en un 80% reutilizando buffers de memoria.',
      'Los benchmarks con go test -benchmem identifican asignaciones innecesarias en el heap en milisegundos.',
      'El uso indiscriminado de canales para sincronización trivial es más lento que sync.Mutex o atomic.Value.'
    ],
    sections: [
      {
        id: 'el-costo-real-de-las-goroutines',
        title: '1. El costo real de una Goroutine y el peligro de los leaks de memoria',
        paragraphs: [
          'Una de las mayores virtudes de Go es su modelo de concurrencia CSP (Communicating Sequential Processes). Una goroutine consume inicialmente apenas 2 KB de memoria en el stack, comparado con los 1-2 MB de un hilo nativo del sistema operativo. Esto permite crear 100,000 goroutines en una máquina modesta sin inmutarse.',
          'Sin embargo, esa ligereza engendra complacencia. Si una goroutine queda bloqueada esperando una lectura en un canal que nunca se cerrará o esperando una respuesta HTTP sin timeout, esa goroutine jamás será recolectada por el GC. En servicios con millones de peticiones diarias, un goteo de 10 goroutines por minuto acumula gigabytes de memoria en pocas horas hasta provocar el colapso del pod.'
        ]
      },
      {
        id: 'patron-worker-pool-acotado',
        title: '2. El Patrón Worker Pool Acotado con Cancelación de Contexto',
        paragraphs: [
          'En lugar de lanzar una goroutine por cada petición entrante de forma irrestricta, creamos un pool de trabajadores fijo que lee de una cola con búfer delimitado. De este modo, la memoria máxima utilizada queda acotada matemáticamente y el sistema responde con backpressure (presión inversa) cuando se satura, en lugar de colapsar.'
        ],
        codeBlock: {
          language: 'go',
          caption: 'Worker Pool seguro y delimitado en Go con graceful shutdown',
          code: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Tarea struct {
	ID    int
	Datos string
}

func IniciarWorkerPool(ctx context.Context, numWorkers int, tareas <-chan Tarea) {
	var wg sync.WaitGroup

	for i := 1; i <= numWorkers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					// Salida limpia y garantizada ante cancelación de contexto
					fmt.Printf("Worker %d finalizando de forma segura\\n", workerID)
					return
				case tarea, ok := <-tareas:
					if !ok {
						return // Canal cerrado por el productor
					}
					procesarTarea(workerID, tarea)
				}
			}
		}(i)
	}

	wg.Wait()
}

func procesarTarea(id int, t Tarea) {
	// Simulación de procesamiento de cálculo
	time.Sleep(10 * time.Millisecond)
}`
        }
      },
      {
        id: 'optimizacion-sync-pool',
        title: '3. Reducción de Asignaciones de Memoria con sync.Pool',
        paragraphs: [
          'En APIs de altísimo volumen que serializan payloads JSON o comprimen buffers binarios, asignar nuevos slices de bytes en cada request fuerza al Garbage Collector de Go a ejecutar barridos frecuentes de marcado y barrido (mark-and-sweep), introduciendo picos de latencia p99 indeseables.',
          'sync.Pool permite reutilizar estructuras ya asignadas entre diferentes goroutines de forma segura, reduciendo las asignaciones en el heap a prácticamente cero en régimen estable.'
        ]
      },
      {
        id: 'benchmarks-y-perfiles-pprof',
        title: '4. Diagnóstico de Contención con go tool pprof',
        paragraphs: [
          'Para detectar cuellos de botella en producción, compilamos perfiles de contención de mutex mediante /debug/pprof/mutex. Un mutex disputado por 100 goroutines simultáneas destruye el paralelismo multicore. En 4kt recomendamos el uso de arquitecturas basadas en particionamiento de datos (sharding de locks) para eliminar la fricción entre hilos de procesamiento.'
        ]
      }
    ]
  },
  {
    id: 'consistencia-distribuida-2026',
    slug: 'modelos-consistencia-sistemas-distribuidos-cap-pacelc',
    title: 'Modelos de Consistencia en Sistemas Distribuidos: Más Allá de CAP con el Teorema PACELC',
    excerpt: 'Análisis exhaustivo de consistencia linealizable, causal, de sesión y eventual: cómo elegir el balance exacto entre latencia y garantías de estado en bases de datos globales.',
    category: 'desarrollo',
    categoryLabel: 'Desarrollo de Software',
    readTime: '15 min de lectura',
    wordCount: 1620,
    publishedAt: '25 de Agosto, 2026',
    updatedAt: '14 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Nodos distribuidos interconectados por haces de luz en red global',
    tags: ['Sistemas Distribuidos', 'PACELC', 'Consistencia', 'Bases de Datos', 'Arquitectura'],
    featured: false,
    views: 6540,
    keyTakeaways: [
      'El teorema de CAP es incompleto: solo describe el comportamiento durante particiones de red, las cuales son raras.',
      'El teorema PACELC formula la compensación real: If Partition (P): Availability (A) vs Consistency (C); Else (E): Latency (L) vs Consistency (C).',
      'La consistencia linealizable exige protocolos de consenso (Raft/Paxos) y paga un tributo inevitable de latencia de ida y vuelta.',
      'La consistencia de sesión (Read-Your-Own-Writes) ofrece la mejor experiencia de usuario con un costo mínimo de sincronización.'
    ],
    sections: [
      {
        id: 'los-limites-del-teorema-cap',
        title: '1. Los límites del Teorema CAP y la realidad del Teorema PACELC',
        paragraphs: [
          'Formulado por Eric Brewer en el año 2000, el teorema CAP demostró que un sistema distribuido no puede ofrecer simultáneamente Consistencia, Disponibilidad y Tolerancia a Particiones. Sin embargo, en la práctica operativa, las particiones de red son anomalías excepcionales. ¿Qué ocurre el 99.9% del tiempo restante cuando la red funciona con normalidad?',
          'Daniel Abadi formuló el teorema PACELC para responder a esta pregunta. Si hay una partición (P), ¿el sistema elige disponibilidad (A) o consistencia (C)? Y si NO hay partición (Else: E), ¿el sistema elige latencia baja (L) o consistencia estricta (C)? Esta matriz describe fielmente el comportamiento de bases de datos como Cassandra, Spanner, DynamoDB o MongoDB.'
        ],
        table: {
          headers: ['Sistema de Datos', 'Clasificación PACELC', 'Garantía en Operación Normal', 'Comportamiento en Partición'],
          rows: [
            ['Google Cloud Spanner', 'PC / EC', 'Consistencia Linealizable (TrueTime)', 'Preserva consistencia, bloquea partición'],
            ['Apache Cassandra', 'PA / EL', 'Baja Latencia (Eventual)', 'Prioriza disponibilidad y escrituras locales'],
            ['Amazon DynamoDB', 'PA / EL (Ajustable)', 'Latencia de milisegundos de un dígito', 'Consistencia eventual por defecto'],
            ['MongoDB (Majority Write)', 'PC / EC', 'Consistencia fuerte en replicaset', 'Detiene escrituras si pierde quórum']
          ]
        }
      },
      {
        id: 'espectro-de-consistencias',
        title: '2. El Espectro de Modelos de Consistencia',
        paragraphs: [
          'No existe una dicotomía binaria entre "consistencia fuerte" y "consistencia eventual". Existe un espectro continuo de modelos formales:',
          '1. Consistencia Linealizable (Linearizability): la ilusión de que existe una única copia del dato en todo el universo y las operaciones ocurren en un instante temporal absoluto.',
          '2. Consistencia Secuencial: todas las operaciones ocurren en un orden determinado respetado por todos los nodos, aunque no necesariamente alineado con el tiempo real físico.',
          '3. Consistencia Causal: si la operación B fue provocada por la operación A, todos los observadores verán A antes que B. Las operaciones no concurrentes sin relación causal pueden observarse en cualquier orden.',
          '4. Read-Your-Own-Writes: garantiza que un usuario siempre verá reflejados sus propios cambios inmediatamente, aunque otros usuarios experimenten un desfase eventual.'
        ]
      },
      {
        id: 'diseno-practico-4kt',
        title: '3. Recomendaciones de Diseño para Aplicaciones de Alto Tráfico',
        paragraphs: [
          'Exigir consistencia linealizable para operaciones de lectura pública (como consultar el catálogo de productos o leer artículos en 4kt.lat) es un desperdicio garrafal de recursos y eleva la latencia global innecesariamente. Reservamos la consistencia fuerte para el saldo financiero de billeteras o el stock de inventario limitado, mientras que para el resto del sistema implementamos consistencia causal con cachés en el borde (Edge CDN).'
        ]
      }
    ]
  },
  {
    id: 'sql-optimization-postgresql-2026',
    slug: 'optimizacion-consultas-sql-particionado-postgresql-produccion',
    title: 'Optimización de Consultas SQL y Particionado en PostgreSQL: Guía de Producción',
    excerpt: 'Técnicas avanzadas para diagnosticar cuellos de botella con EXPLAIN ANALYZE, diseño de índices BRIN y particionado declarativo de tablas con cientos de millones de filas.',
    category: 'desarrollo',
    categoryLabel: 'Desarrollo de Software',
    readTime: '16 min de lectura',
    wordCount: 1730,
    publishedAt: '15 de Agosto, 2026',
    updatedAt: '03 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Servidor de bases de datos con líneas de código SQL estructurado',
    tags: ['PostgreSQL', 'SQL', 'Bases de Datos', 'Particionado', 'Performance'],
    featured: false,
    views: 8910,
    keyTakeaways: [
      'Un índice mal ubicado degrada la velocidad de escritura sin acelerar las lecturas en consultas con baja cardinalidad.',
      'Los índices BRIN (Block Range Index) ocupan menos del 1% del espacio de un índice B-Tree en datos secuenciales temporales.',
      'El particionado declarativo por rango reduce los tiempos de consulta mediante exclusión de particiones (Partition Pruning).',
      'El análisis de buffer hits en EXPLAIN (ANALYZE, BUFFERS) revela lecturas innecesarias en disco antes de que saturen el I/O.'
    ],
    sections: [
      {
        id: 'diagnostico-explain-buffers',
        title: '1. Diagnóstico Avanzado con EXPLAIN (ANALYZE, BUFFERS)',
        paragraphs: [
          'La mayoría de desarrolladores se limita a ejecutar EXPLAIN simple para ver el costo estimado del optimizador. Sin embargo, ese costo es solo una conjetura matemática. Para optimizar con rigor empírico, es obligatorio ejecutar EXPLAIN (ANALYZE, BUFFERS, VERBOSE).',
          'El parámetro BUFFERS nos indica cuántos bloques de 8 KB fueron leídos de la memoria compartida (shared hit) y cuántos tuvieron que ser leídos directamente del disco físico (shared read). Reducir los bloques leídos es la única garantía de que una consulta escalará cuando el dataset supere la capacidad de la memoria RAM.'
        ]
      },
      {
        id: 'particionado-declarativo-tiempo',
        title: '2. Particionado Declarativo por Rango de Fechas',
        paragraphs: [
          'Cuando una tabla de registros o auditoría supera los 50 millones de filas, los índices B-Tree tradicionales dejan de caber en la memoria de trabajo. El particionado declarativo divide la tabla en subtablas físicas transparentes para la aplicación.'
        ],
        codeBlock: {
          language: 'sql',
          caption: 'Particionado declarativo mensual con índices locales en PostgreSQL',
          code: `-- Tabla principal particionada por fecha
CREATE TABLE eventos_telemetria (
  id UUID DEFAULT gen_random_uuid(),
  dispositivo_id VARCHAR(64) NOT NULL,
  evento_tipo VARCHAR(32) NOT NULL,
  payload JSONB NOT NULL,
  creado_en TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (creado_en);

-- Partición correspondiente al mes en curso
CREATE TABLE eventos_telemetria_2026_10 
PARTITION OF eventos_telemetria
FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');

-- Índice BRIN ultraligero sobre la columna de fecha (ideal para series temporales)
CREATE INDEX idx_telemetria_brin_fecha 
ON eventos_telemetria USING brin (creado_en);`
        }
      },
      {
        id: 'indices-brin-vs-btree',
        title: '3. Índices BRIN: Rendimiento Masivo con Espacio Mínimo',
        paragraphs: [
          'A diferencia de un índice B-Tree que indexa cada fila individual, un índice BRIN almacena únicamente los valores mínimo y máximo de cada rango de bloques contiguos en disco. En tablas donde los datos se insertan cronológicamente, un índice BRIN ocupa 5 MB donde un B-Tree ocuparía 2.4 GB, logrando la misma velocidad de filtrado con una fracción del consumo de memoria.'
        ]
      }
    ]
  }
];
