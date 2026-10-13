import { Article } from '../../types';
import { ANDRES_MARTINEZ } from '../author';

export const CLOUD_ARTICLES: Article[] = [
  {
    id: 'infraestructura-cloud-terraform-2026',
    slug: 'infraestructura-como-codigo-terraform-opentofu-mejores-practicas',
    title: 'Infraestructura como Código con Terraform y OpenTofu: Patrones de Modularidad y Seguridad',
    excerpt: 'Diseño de arquitecturas multi-entorno reproducibles: control de drift, gestión segura de secretos con HashiCorp Vault, pipelines CI/CD y políticas como código con Sentinel/OPA.',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    readTime: '15 min de lectura',
    wordCount: 1650,
    publishedAt: '22 de Septiembre, 2026',
    updatedAt: '08 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Planeta tierra interconectado con nodos de fibra óptica y satélites cloud',
    tags: ['Terraform', 'OpenTofu', 'IaC', 'DevOps', 'Cloud Architecture'],
    featured: false,
    views: 7890,
    keyTakeaways: [
      'Almacenar secretos o contraseñas en texto plano dentro del archivo de estado .tfstate es una vulnerabilidad crítica.',
      'Estructurar módulos por capas desacopladas (Networking, Cómputo, Datos) previene bloqueos catastróficos de estado.',
      'Open Policy Agent (OPA) previene la creación de recursos costosos o inseguros antes de que se ejecute el apply.',
      'El uso de backends remotos con bloqueo distribuido (S3 + DynamoDB o GCS) evita corrupción por escrituras concurrentes.'
    ],
    sections: [
      {
        id: 'modularidad-sin-friccion',
        title: '1. Modularidad desacoplada y segregación del estado remoto',
        paragraphs: [
          'Uno de los errores más destructivos en la gestión de Infraestructura como Código (IaC) es agrupar toda la topología en un único archivo de estado monolítico. En esa configuración, cambiar la configuración de un subdominio DNS bloquea el estado de toda la red VPC y de los clusters de Kubernetes de la empresa.',
          'En 4kt implementamos la regla de segregación por capas: dividimos la infraestructura en módulos independientes con ciclos de vida distintos (Capa de Fundación de Red, Capa de Plataforma de Cómputo y Capa de Aplicaciones). Cada capa mantiene su propio backend remoto con permisos de acceso restringidos por RBAC.'
        ]
      },
      {
        id: 'gestion-segura-secretos',
        title: '2. Cero Secretos en el Archivo de Estado (Zero Secret State)',
        paragraphs: [
          'El archivo .tfstate contiene una representación en texto plano de todos los recursos aprovisionados. Si generas contraseñas de bases de datos o claves privadas SSL directamente con recursos nativos de Terraform, esos valores residen en texto claro dentro del bucket de estado.',
          'La solución profesional consiste en delegar la generación y rotación de credenciales a un gestor de secretos externo (como HashiCorp Vault o AWS Secrets Manager), permitiendo que Terraform solo referencie el puntero de metadatos o el ARN del secreto.'
        ],
        codeBlock: {
          language: 'hcl',
          caption: 'Definición de cluster EKS modular con OpenTofu y políticas de cifrado',
          code: `module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "prod-4kt-cluster"
  cluster_version = "1.31"

  # Aislamiento de red: acceso a la API exclusivamente dentro de la VPC privada
  cluster_endpoint_public_access  = false
  cluster_endpoint_private_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    spot_nodes = {
      min_size     = 3
      max_size     = 20
      desired_size = 5
      instance_types = ["c6i.2xlarge", "c6a.2xlarge"]
      capacity_type  = "SPOT"
    }
  }

  tags = {
    Entorno   = "Produccion"
    Gestion   = "IaC-OpenTofu"
    Autor     = "Andres Martinez"
  }
}`
        }
      },
      {
        id: 'deteccion-drift-automatica',
        title: '3. Detección Continua de Drift con Pipelines Programados',
        paragraphs: [
          'El "drift" (la divergencia entre lo que define el código y lo que realmente existe en la consola de la nube) ocurre inevitablemente cuando operadores realizan cambios manuales de emergencia. Para garantizar congruencia, configuramos ejecuciones diarias de "terraform plan -detailed-exitcode" en GitHub Actions que notifican anomalías inmediatamente.'
        ]
      }
    ]
  },
  {
    id: 'resiliencia-kubernetes-2026',
    slug: 'patrones-de-resiliencia-kubernetes-circuit-breaker-rate-limiting',
    title: 'Patrones de Resiliencia en Kubernetes: Circuit Breaker y Rate Limiting en la Capa de Tráfico',
    excerpt: 'Diseño de arquitecturas tolerantes a fallos transitorios en clusters productivos: mitigación de tormentas de reintentos, límites con token bucket y timeouts adaptativos con Envoy y Cilium.',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    readTime: '16 min de lectura',
    wordCount: 1720,
    publishedAt: '28 de Septiembre, 2026',
    updatedAt: '06 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Tablero de control de tráfico en la nube con indicadores de latencia',
    tags: ['Kubernetes', 'Envoy', 'Circuit Breaker', 'Resiliencia', 'DevOps'],
    featured: false,
    views: 6890,
    keyTakeaways: [
      'Reintentar peticiones fallidas sin backoff exponencial ni jitter multiplica por 10 el tráfico durante caídas parciales.',
      'Un Circuit Breaker configurado en Envoy aísla pods degradados en menos de 200 ms evitando el colapso global.',
      'El Rate Limiting distribuido con algoritmos Token Bucket y Redis protege microservicios aguas abajo.',
      'Los probes de salud mal configurados (Liveness Probes agresivos) provocan reinicios en bucle infinito durante picos de carga.'
    ],
    sections: [
      {
        id: 'la-tormenta-de-reintentos',
        title: '1. La anatomía de una tormenta de reintentos (Retry Storm)',
        paragraphs: [
          'Cuando un microservicio downstream se satura y su tiempo de respuesta sube de 50 ms a 1,500 ms, los clientes aguas arriba empiezan a experimentar timeouts. Si cada cliente tiene programados 3 reintentos inmediatos, el tráfico total entrante al servicio degradado no disminuye: se cuadruplica instantáneamente.',
          'Este fenómeno, conocido como "tormenta de reintentos", impide que el servicio convaleciente se recupere por sí solo. En 4kt aplicamos dos defensas obligatorias: reintentos con Exponential Backoff y Full Jitter (dispersión pseudoaleatoria) y límites máximos globales de reintentos presupuestados (Retry Budgets).'
        ]
      },
      {
        id: 'circuit-breaking-con-envoy',
        title: '2. Implementación de Circuit Breaker y Detección de Outliers en Envoy',
        paragraphs: [
          'Un cortacircuitos (Circuit Breaker) monitoriza los códigos de error consecutivos. Si un pod individual devuelve 5 errores HTTP 5xx consecutivos, el proxy lo expulsa temporalmente del pool de balanceo durante 30 segundos, permitiendo que el tráfico restante se canalice únicamente hacia réplicas sanas.'
        ],
        codeBlock: {
          language: 'yaml',
          caption: 'Configuración de OutlierDetection y CircuitBreaker en Envoy Proxy',
          code: `apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: resiliencia-servicio-pagos
spec:
  host: pagos.default.svc.cluster.local
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 1024
      http:
        http1MaxPendingRequests: 100
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 50`
        }
      },
      {
        id: 'el-error-comun-liveness-probes',
        title: '3. El Peligro Oculto de los Liveness Probes Mal Diseñados',
        paragraphs: [
          'Uno de los errores más frecuentes observados en producción es hacer que el endpoint del Liveness Probe de Kubernetes verifique la conexión a la base de datos o a servicios externos. Si la base de datos experimenta un bloqueo temporal de 10 segundos, TODOS los pods de Kubernetes fallan su Liveness Probe simultáneamente y el kubelet mata y reinicia todos los contenedores a la vez, transformando una degradación leve en un apagón total.'
        ]
      }
    ]
  },
  {
    id: 'observabilidad-opentelemetry-2026',
    slug: 'observabilidad-distribuida-opentelemetry-jaeger-grafana',
    title: 'Observabilidad Distribuida con OpenTelemetry: De Métricas Aisladas a Trazas End-to-End',
    excerpt: 'Instrumentación estándar neutral de microservicios: propagación de contexto W3C TraceContext, muestreo inteligente en el OTel Collector y correlación unificada de métricas, trazas y logs.',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    readTime: '15 min de lectura',
    wordCount: 1600,
    publishedAt: '12 de Septiembre, 2026',
    updatedAt: '29 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Gráficos interactivos de telemetría, latencia y observabilidad de sistemas',
    tags: ['OpenTelemetry', 'Jaeger', 'Grafana', 'Observabilidad', 'DevOps'],
    featured: false,
    views: 8120,
    keyTakeaways: [
      'OpenTelemetry estandariza la instrumentación evitando el vendor lock-in con plataformas propietarias.',
      'El estándar W3C TraceContext permite rastrear el viaje completo de una petición a través de múltiples lenguajes.',
      'El muestreo basado en colas (Tail-Based Sampling) captura el 100% de las trazas con errores sin pagar el costo de almacenar peticiones exitosas irrelevantes.',
      'Correlacionar logs con TraceID y SpanID reduce el tiempo medio de resolución (MTTR) de horas a minutos.'
    ],
    sections: [
      {
        id: 'la-crisis-de-los-silos-de-monitoreo',
        title: '1. La crisis de los silos de monitoreo y la convergencia en OpenTelemetry',
        paragraphs: [
          'Históricamente, los equipos de operaciones mantenían tres herramientas aisladas: Prometheus para métricas de CPU/RAM, Elasticsearch para logs de texto y una herramienta propietaria para trazas APM. Cuando ocurría un incidente a las 3:00 AM, los ingenieros intentaban desesperadamente adivinar qué log correspondía a qué pico en la gráfica de latencia.',
          'OpenTelemetry (OTel) resuelve este problema convirtiéndose en el estándar universal de la CNCF. Al inyectar un identificador de traza global (TraceID) en cada petición, cada log emitido y cada métrica generada quedan vinculados criptográficamente al mismo hilo de ejecución.'
        ]
      },
      {
        id: 'pipeline-otel-collector',
        title: '2. Arquitectura del OpenTelemetry Collector y Tail-Based Sampling',
        paragraphs: [
          'En sistemas con decenas de miles de peticiones por segundo, almacenar todas las trazas es prohibitivo en costos de almacenamiento. Si utilizamos Head-Based Sampling (muestrear al inicio), descartamos al azar el 95% del tráfico, lo que significa que el 95% de los errores y excepciones críticas se perderán sin quedar registrados.',
          'La solución es Tail-Based Sampling en el OTel Collector: el colector retiene las trazas en un búfer temporal en memoria hasta que la petición finaliza. Si la petición devolvió un código 500 o tardó más de 2 segundos, se guarda obligatoriamente; si fue un 200 OK rápido, se descarta.'
        ],
        codeBlock: {
          language: 'yaml',
          caption: 'Configuración de Tail-Based Sampling en el OTel Collector',
          code: `processors:
  tail_sampling:
    decision_wait: 5s
    num_traces: 10000
    expected_new_traces_per_sec: 2000
    policies:
      # Política 1: Conservar 100% de las trazas que contengan errores
      - name: muestreo-errores
        type: status_code
        status_code: { status_codes: [ ERROR ] }
      # Política 2: Conservar trazas con latencia excesiva (p99 > 1500ms)
      - name: muestreo-latencia-alta
        type: latency
        latency: { threshold_ms: 1500 }
      # Política 3: Conservar 1% del tráfico normal para métricas de referencia
      - name: muestreo-estadistico
        type: probabilistic
        probabilistic: { sampling_percentage: 1.0 }`
        }
      }
    ]
  },
  {
    id: 'serverless-pros-cons-2026',
    slug: 'arquitecturas-serverless-casos-de-uso-y-antipatrones',
    title: 'Arquitecturas Serverless: Cuándo Aceleran el Negocio y Cuándo Destruyen el Presupuesto',
    excerpt: 'Análisis económico y técnico de arquitecturas FaaS: mitigación de arranques en frío (cold starts), límites de concurrencia y antipatrones de bases de datos.',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    readTime: '15 min de lectura',
    wordCount: 1580,
    publishedAt: '30 de Agosto, 2026',
    updatedAt: '18 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Infraestructura cloud abstracta con luces de cómputo elástico sin servidor',
    tags: ['Serverless', 'AWS Lambda', 'Cloud Run', 'FaaS', 'Costos Cloud'],
    featured: false,
    views: 7120,
    keyTakeaways: [
      'Serverless es invencible para cargas con tráfico espasmódico o intermitente que escalan a cero.',
      'Para cargas predecibles de alto volumen sostenido las 24 horas, las instancias reservadas son hasta un 70% más baratas que FaaS.',
      'Conectar miles de funciones Lambda concurrentes a un PostgreSQL tradicional agota el pool de conexiones en segundos sin Proxy RDS.',
      'El empaquetado mínimo de binarios y el uso de lenguajes compilados (Go, Rust) reducen los cold starts a menos de 40 ms.'
    ],
    sections: [
      {
        id: 'la-curva-economica-serverless',
        title: '1. La curva de cruce de costos: FaaS vs Contenedores Dedicados',
        paragraphs: [
          'Serverless promete pagar únicamente por el tiempo exacto de cómputo consumido. Para startups y servicios secundarios cuyo tráfico varía ampliamente a lo largo del día, este modelo ahorra miles de dólares al escalar literalmente a cero durante la noche.',
          'Sin embargo, cuando una API alcanza una tasa constante de 500 peticiones por segundo las 24 horas del día, el costo por gigabyte-segundo de AWS Lambda o Google Cloud Functions supera con creces el costo de operar un cluster Kubernetes en nodos dedicados o spot.'
        ]
      },
      {
        id: 'el-antipatron-de-conexiones-db',
        title: '2. El Antipatrón Fatal: Funciones FaaS contra Bases Relacionales',
        paragraphs: [
          'PostgreSQL y MySQL fueron diseñados bajo la premisa de que las conexiones son duraderas y costosas de inicializar. Si una función serverless escala repentinamente a 2,000 instancias concurrentes para absorber un pico de tráfico y cada instancia abre una conexión TCP a la base de datos, el servidor de base de datos colapsará por agotamiento de descriptores de archivos y memoria.',
          'Para operar serverless con bases de datos relacionales es imperativo intercalar un gestor de pooling transaccional como PgBouncer o AWS RDS Proxy.'
        ]
      }
    ]
  },
  {
    id: 'zero-downtime-deployments-2026',
    slug: 'estrategias-despliegue-zero-downtime-blue-green-canary',
    title: 'Estrategias de Despliegue Zero-Downtime: Blue-Green, Canary y Migraciones Expand-Contract',
    excerpt: 'Metodología definitiva para desplegar software a producción sin interrumpir el servicio ni perder transacciones de clientes: cambio de tráfico con Argo Rollouts y migraciones de esquemas en fases.',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    readTime: '16 min de lectura',
    wordCount: 1690,
    publishedAt: '28 de Julio, 2026',
    updatedAt: '15 de Agosto, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Microchip y circuitería con luces que simbolizan despliegues continuos sin interrupción',
    tags: ['DevOps', 'CI/CD', 'Kubernetes', 'Argo Rollouts', 'Zero Downtime'],
    featured: false,
    views: 8450,
    keyTakeaways: [
      'Un despliegue de software real involucra dos dimensiones: código y esquema de base de datos.',
      'El patrón Expand and Contract permite que versiones antiguas y nuevas de la aplicación coexistan durante el rollout.',
      'Canary Deployments con análisis automatizado de métricas revierten el despliegue ante anomalías de tasa de error sin intervención humana.',
      'Los Rolling Updates sin Readiness Probes causan caídas temporales de tráfico durante el reinicio de pods.'
    ],
    sections: [
      {
        id: 'el-mito-del-rolling-update-simple',
        title: '1. Por qué el Rolling Update predeterminado de Kubernetes no es suficiente',
        paragraphs: [
          'Kubernetes ofrece Rolling Updates listos para usar, pero si tu nueva versión de software requiere una columna de base de datos que la versión anterior no conocía, cambiar los pods gradualmente generará errores masivos.',
          'Durante los 10 minutos que dura el despliegue, peticiones de usuarios caerán indistintamente en pods con la versión V1 y pods con la versión V2. Si la base de datos no es compatible hacia atrás y hacia adelante simultáneamente, el sistema fallará.'
        ]
      },
      {
        id: 'patron-expand-and-contract',
        title: '2. El Patrón Expand and Contract para Migraciones de Datos',
        paragraphs: [
          'Para modificar una tabla en producción sin tiempo de inactividad, dividimos la migración en tres fases independientes desplegadas en días distintos:',
          'Fase 1 (Expand): agregamos la nueva columna o tabla sin eliminar la anterior. El código escribe en ambas pero lee de la antigua.',
          'Fase 2 (Migración de datos): un proceso en segundo plano sincroniza los registros históricos.',
          'Fase 3 (Contract): el código pasa a leer de la nueva estructura y, tras verificar estabilidad, se elimina la estructura obsoleta.'
        ]
      }
    ]
  }
];
