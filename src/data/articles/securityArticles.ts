import { Article } from '../../types';
import { ANDRES_MARTINEZ } from '../author';

export const SECURITY_ARTICLES: Article[] = [
  {
    id: 'ciberseguridad-zero-trust-2026',
    slug: 'ciberseguridad-zero-trust-aplicaciones-cloud-native-guia-practica',
    title: 'Ciberseguridad Zero Trust en Aplicaciones Cloud Native: Guía de Implementación',
    excerpt: 'Cómo transformar la seguridad perimetral tradicional en un modelo donde nunca se confía y siempre se verifica cada petición mediante identidades criptográficas, mTLS y telemetría eBPF.',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad',
    readTime: '16 min de lectura',
    wordCount: 1740,
    publishedAt: '18 de Septiembre, 2026',
    updatedAt: '05 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Candado digital con código binario y visualización de seguridad cibernética',
    tags: ['Ciberseguridad', 'Zero Trust', 'mTLS', 'Kubernetes', 'Cloud Security'],
    featured: false,
    views: 9420,
    keyTakeaways: [
      'Las VPNs perimetrales tradicionales otorgan acceso lateral indiscriminado tras una sola brecha de credencial.',
      'SPIFFE/SPIRE y mTLS asignan identidades criptográficas con rotación automática a cada contenedor individual.',
      'eBPF audita llamadas al kernel de Linux en tiempo real sin requerir inyección de sidecars intrusivos.',
      'El principio de Privilegio Mínimo (PoLP) debe aplicarse tanto a identidades humanas como a identidades de servicio no humanas.'
    ],
    sections: [
      {
        id: 'la-muerte-del-perimetro-de-red',
        title: '1. La obsolescencia irreversible de la seguridad perimetral tradicional',
        paragraphs: [
          'Durante décadas, el modelo de seguridad dominante fue el del "castillo y foso": una frontera fortificada (firewall perimetral y VPN) que asumía que todo lo que estaba dentro de la red corporativa era seguro y todo lo que estaba fuera era hostil. Una vez que un atacante obtenía acceso mediante phishing o credenciales comprometidas, tenía vía libre para desplazarse lateralmente entre bases de datos y servidores internos sin oposición.',
          'Zero Trust desmantela esta premisa obsoleta bajo un axioma innegociable: "Nunca confíes, siempre verifica explícitamente". En una arquitectura Zero Trust, cada paquete de red, cada llamada a API y cada interacción entre microservicios se autentica, se autoriza y se cifra, incluso si ambos contenedores residen en el mismo nodo físico de Kubernetes.'
        ]
      },
      {
        id: 'identidad-spiffe-spire',
        title: '2. Identidad Criptográfica de Servicios con SPIFFE y SPIRE',
        paragraphs: [
          'En entornos dinámicos de contenedores y nubes efímeras, las direcciones IP carecen de valor semántico como criterio de seguridad. Un pod puede nacer y morir en 30 segundos recibiendo una IP reciclada.',
          'SPIFFE (Secure Production Identity Framework for Everyone) define un estándar para emitir identidades criptográficas universales mediante SVIDs (SPIFFE Verifiable Identity Documents). SPIRE actúa como la autoridad certificadora que atestigua las características del contenedor (UID de Linux, namespace, hash del binario) y le emite un certificado X.509 de vida ultracorta (rotado automáticamente cada hora) sin necesidad de contraseñas estáticas.'
        ],
        codeBlock: {
          language: 'bash',
          caption: 'Inspección de un certificado de identidad de servicio SPIFFE en Kubernetes',
          code: `# Obtener el SPIFFE ID emitido a un pod mediante el agente SPIRE local
spire-agent api fetch x509 -socketPath /run/spire/sockets/agent.sock

# Salida del certificado verificable:
# SPIFFE ID: spiffe://4kt.lat/ns/produccion/sa/servicio-pagos
# Validez: 1 hora (Rotación automática transparente)
# Algoritmo: ECDSA P-256 con TLS 1.3 estricto`
        }
      },
      {
        id: 'ebpf-cilium-visibilidad',
        title: '3. Microsegmentación y Telemetría en el Kernel con eBPF',
        paragraphs: [
          'Para forzar políticas de red de Privilegio Mínimo sin penalizar el rendimiento con proxies intermedios, utilizamos eBPF (Extended Berkeley Packet Filter) mediante Cilium. Al programar ganchos directos en el kernel de Linux, eBPF intercepta llamadas a nivel de socket de red y llamadas al sistema (syscalls), bloqueando conexiones no autorizadas antes de que alcancen el stack de red del usuario.'
        ]
      }
    ]
  },
  {
    id: 'seguridad-apis-oauth-2026',
    slug: 'seguridad-apis-rest-graphql-oauth21-token-hardening',
    title: 'Seguridad en APIs REST y GraphQL con OAuth 2.1: Hardening de Tokens y Mitigación de Fugas',
    excerpt: 'Guía de defensa en profundidad para blindar endpoints contra vulnerabilidades BOLA/IDOR, ataques de suplantación y falsificación de tokens JWT mediante DPoP y MTLS.',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad',
    readTime: '15 min de lectura',
    wordCount: 1680,
    publishedAt: '10 de Octubre, 2026',
    updatedAt: '12 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Código de seguridad informática con autenticación de claves de cifrado criptográfico',
    tags: ['OAuth 2.1', 'JWT', 'DPoP', 'API Security', 'BOLA'],
    featured: false,
    views: 8120,
    keyTakeaways: [
      'OAuth 2.1 elimina flujos inseguros como el Implicit Grant y exige PKCE universalmente en clientes web y móviles.',
      'DPoP (Demonstrating Proof-of-Possession) vincula el access token a la clave privada del cliente impidiendo el uso de tokens robados.',
      'El 72% de las brechas en APIs documentadas en OWASP provienen de fallos de autorización a nivel de objeto (BOLA/BFLA).',
      'Los tokens JWT deben validarse estrictamente contra el algoritmo esperado (evitando la vulnerabilidad alg: none).'
    ],
    sections: [
      {
        id: 'la-evolucion-a-oauth-2-1',
        title: '1. Qué cambia con OAuth 2.1 y por qué es obligatorio',
        paragraphs: [
          'OAuth 2.0 acumuló una década de parches y extensiones. Su especificación permitía flujos vulnerables diseñados en 2012 que hoy son inaceptables. OAuth 2.1 consolida las mejores prácticas de seguridad en un estándar único y riguroso:',
          '1. Eliminación total del Implicit Grant y del Resource Owner Password Credentials Grant.',
          '2. Exigencia obligatoria de PKCE (Proof Key for Code Exchange) para todos los clientes sin excepción.',
          '3. Coincidencia exacta de Redirect URIs (prohibiendo comodines en URLs de callback).',
          '4. Rotación obligatoria de Refresh Tokens con detección de reuso para revocar sesiones comprometidas.'
        ]
      },
      {
        id: 'dpop-contra-secuestro-tokens',
        title: '2. DPoP: Fin al problema de los Bearer Tokens vulnerables',
        paragraphs: [
          'Históricamente, los Bearer Tokens se comportan como dinero en efectivo: cualquiera que intercepte el token puede usarlo como si fuera el dueño legítimo. Con DPoP (RFC 9449), el cliente genera un par de claves criptográficas efímeras (pública/privada) en el navegador o dispositivo.',
          'En cada petición a la API, el cliente envía el token junto con una cabecera HTTP "DPoP" que contiene un JWT firmado con su clave privada, demostrando la posesión de la misma. Si un atacante intercepta el token en tránsito o por un log mal configurado, no podrá utilizarlo sin la clave privada del dispositivo original.'
        ],
        codeBlock: {
          language: 'typescript',
          caption: 'Validación de cabecera DPoP con verificación de thumbprint en backend',
          code: `import { createHash } from 'crypto';

export function validarDPoPProof(token: string, dpopProofHeader: string, requestUrl: string, httpMethod: string) {
  // 1. Decodificar cabecera DPoP y verificar firma con la clave pública embebida
  const { header, payload } = verificarFirmaDPoP(dpopProofHeader);

  // 2. Comprobar que la URL y el método coincidan exactamente con la petición
  if (payload.htu !== requestUrl || payload.htm !== httpMethod) {
    throw new Error('DPoP: Discrepancia entre la URI o método firmado y la petición real');
  }

  // 3. Validar ventana de frescura del timestamp para prevenir ataques de replay
  const ahora = Math.floor(Date.now() / 1000);
  if (Math.abs(ahora - payload.iat) > 120) {
    throw new Error('DPoP: Token proof expirado o timestamp desincronizado');
  }

  // 4. Verificar que el hash del access token coincida con el claim 'ath'
  const tokenHash = createHash('sha256').update(token).digest('base64url');
  if (payload.ath !== tokenHash) {
    throw new Error('DPoP: El token presentado no coincide con la prueba criptográfica');
  }

  return true;
}`
        }
      },
      {
        id: 'mitigacion-bola-idor',
        title: '3. Mitigación de BOLA (Broken Object Level Authorization)',
        paragraphs: [
          'La vulnerabilidad número 1 según OWASP API Security es BOLA: un usuario autenticado con ID 100 consulta la URL /api/v1/facturas/101 y la API devuelve la información sin verificar si la factura pertenece realmente al usuario solicitante.',
          'En 4kt implementamos verificación de políticas a nivel de consulta en el ORM mediante filtros automáticos de tenant y autorización declarativa con Casbin o Cedar.'
        ]
      }
    ]
  },
  {
    id: 'mitigacion-ddos-capa7-2026',
    slug: 'deteccion-mitigacion-ataques-ddos-capa-7-cloud',
    title: 'Detección y Mitigación de Ataques DDoS en Capa 7: Blindaje en el Edge',
    excerpt: 'Estrategias para neutralizar ataques volumétricos HTTP/2 Rapid Reset, inundaciones de peticiones lentas (Slowloris) y botnets distribuidas mediante huellas JA4 y rate limiting inteligente.',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad',
    readTime: '15 min de lectura',
    wordCount: 1610,
    publishedAt: '15 de Septiembre, 2026',
    updatedAt: '04 de Octubre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Servidores de red con cables iluminados bajo tráfico masivo',
    tags: ['DDoS', 'Capa 7', 'Cloudflare', 'WAF', 'Seguridad Web'],
    featured: false,
    views: 6710,
    keyTakeaways: [
      'Los ataques de Capa 7 simulan tráfico legítimo y no pueden mitigarse únicamente con filtros de firewall de Capa 3/4.',
      'El ataque HTTP/2 Rapid Reset satura servidores enviando streams seguidos de cancelaciones RST_STREAM masivas.',
      'El fingerprinting JA4 identifica clientes maliciosos analizando los parámetros del apretón de manos TLS y extensiones.',
      'Las políticas de rate limiting deben basarse en huellas compuestas (Fingerprint + Token) y no solo en IP.'
    ],
    sections: [
      {
        id: 'la-sofisticacion-de-los-ataques-l7',
        title: '1. Por qué los ataques de Capa 7 son los más costosos y destructivos',
        paragraphs: [
          'A diferencia de los ataques volumétricos tradicionales (como amplificaciones UDP o inundaciones SYN) que buscan saturar el ancho de banda del proveedor de red, los ataques de Capa 7 (HTTP/HTTPS) atacan el cómputo de la aplicación: obligan al servidor a ejecutar consultas complejas a la base de datos, validar firmas criptográficas o parsear payloads pesados.',
          'Una botnet que genere apenas 2,000 peticiones por segundo dirigidas específicamente a un endpoint de búsqueda o exportación de PDFs puede dejar inoperativo un cluster completo si las peticiones no se filtran en el borde (Edge Network) antes de alcanzar los servidores de origen.'
        ]
      },
      {
        id: 'huellas-ja4-fingerprinting',
        title: '2. Identificación Inmune a Cambios de IP con JA4 TLS Fingerprinting',
        paragraphs: [
          'Las botnets modernas rotan millones de direcciones IP residenciales infectadas, haciendo que el bloqueo tradicional por reputación de IP sea completamente inútil o provoque falsos positivos masivos con usuarios legítimos.',
          'JA4 genera una huella criptográfica basada en el Client Hello del protocolo TLS: conjuntos de cifrado soportados, extensiones, curvas elípticas y versiones de ALPN. Una herramienta de ataque como Python Requests, Golang Net/HTTP o un bot automatizado posee una huella JA4 inconfundible y fija, independientemente de la dirección IP que utilice para conectarse.'
        ]
      }
    ]
  },
  {
    id: 'supply-chain-security-2026',
    slug: 'seguridad-cadena-suministro-software-sbom-sigstore-cosign',
    title: 'Seguridad en la Cadena de Suministro de Software: SBOM, Sigstore y Verificación Criptográfica',
    excerpt: 'Protección de pipelines de desarrollo contra dependencias maliciosas y ataques de inyección: generación de SBOM con CycloneDX y firma de contenedores con Cosign.',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad',
    readTime: '15 min de lectura',
    wordCount: 1650,
    publishedAt: '20 de Agosto, 2026',
    updatedAt: '05 de Septiembre, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Visualización de cadenas de bloques criptográficas y seguridad de software',
    tags: ['Supply Chain', 'SBOM', 'Cosign', 'Sigstore', 'DevSecOps'],
    featured: false,
    views: 5980,
    keyTakeaways: [
      'El 90% del código en una aplicación moderna proviene de paquetes y dependencias de terceros (npm, PyPI, crates).',
      'Un Software Bill of Materials (SBOM) estandarizado es la única forma de auditar vulnerabilidades tipo Log4j en minutos.',
      'Sigstore y Cosign permiten firmar imágenes de Docker en pipelines CI/CD utilizando identidades OIDC efímeras sin almacenar claves privadas.',
      'Kubernetes debe rechazar la ejecución de cualquier contenedor cuya firma no esté verificada por Kyverno o Gatekeeper.'
    ],
    sections: [
      {
        id: 'el-vector-de-ataque-cadena-suministro',
        title: '1. El ascenso de los ataques a la cadena de suministro de software',
        paragraphs: [
          'Los atacantes han comprendido que atacar directamente una infraestructura blindada de un banco o empresa es difícil; infectar una biblioteca de código abierto de uso común mantenida por un voluntario y esperar a que la empresa la importe en su próximo build de npm es mucho más sencillo y devastador.',
          'Ataques recientes de toma de control de cuentas de mantenedores e inyección de malware en registros públicos han demostrado que el código no solo debe compilar: debe ser verificable criptográficamente desde el commit original hasta el contenedor en ejecución.'
        ]
      },
      {
        id: 'firma-con-cosign-en-ci',
        title: '2. Firma y Verificación de Contenedores con Sigstore Cosign',
        paragraphs: [
          'Con Cosign, el runner de CI/CD (como GitHub Actions) solicita un token de identidad OIDC temporal. La autoridad de certificación transparente de Sigstore (Fulcio) emite un certificado efímero y registra la firma en un libro mayor inmutable y públicamente auditable (Rekor). De este modo, no existen claves privadas que puedan filtrarse.'
        ],
        codeBlock: {
          language: 'bash',
          caption: 'Firma y verificación de imagen de producción sin llaves estáticas (Keyless)',
          code: `# Firmar la imagen de Docker generada en GitHub Actions
cosign sign --yes ghcr.io/4kt/api-core:v2.4.0

# Verificar la firma antes de permitir el despliegue en el cluster
cosign verify \\
  --certificate-identity "https://github.com/4kt/core-repo/.github/workflows/deploy.yml@refs/heads/main" \\
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \\
  ghcr.io/4kt/api-core:v2.4.0`
        }
      }
    ]
  },
  {
    id: 'redes-wireguard-tailscale-2026',
    slug: 'redes-privadas-zero-trust-wireguard-tailscale-mesh',
    title: 'Redes Privadas y Mesh con WireGuard y Tailscale: Rendimiento Criptográfico y Topologías P2P',
    excerpt: 'Análisis de protocolos VPN modernos: eliminación del overhead de OpenVPN con criptografía moderna de curvas elípticas Noise Protocol, perforación NAT (STUN/DERP) y arquitecturas mesh.',
    category: 'gadgets',
    categoryLabel: 'Hardware & Redes',
    readTime: '16 min de lectura',
    wordCount: 1720,
    publishedAt: '05 de Agosto, 2026',
    updatedAt: '22 de Agosto, 2026',
    author: ANDRES_MARTINEZ,
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Infraestructura de hardware con enrutadores y cableado de red de alta velocidad',
    tags: ['WireGuard', 'Tailscale', 'Redes', 'VPN', 'Hardware'],
    featured: false,
    views: 9140,
    keyTakeaways: [
      'WireGuard vive dentro del kernel de Linux con menos de 4,000 líneas de código, frente a las más de 100,000 líneas de OpenVPN.',
      'El uso de ChaCha20-Poly1305 y Curve25519 ofrece rendimiento de velocidad de línea sin estrangular la CPU en hardware embebido.',
      'Tailscale orquesta topologías de malla (Mesh) completas punto a punto perforando NATs corporativos mediante DERP y STUN.',
      'La itinerancia transparente (Roaming) permite cambiar de WiFi a datos móviles sin reiniciar el túnel de red.'
    ],
    sections: [
      {
        id: 'la-revolucion-de-wireguard',
        title: '1. La revolución de WireGuard en el stack de redes de Linux',
        paragraphs: [
          'Durante dos décadas, las VPNs corporativas dependieron de OpenVPN e IPsec: protocolos monstruosamente complejos con decenas de opciones de cifrado heredadas, sobrecarga masiva de CPU y configuraciones proclives a errores humanos. WireGuard rediseñó las redes privadas desde sus cimientos.',
          'Con menos de 4,000 líneas de código auditables en el kernel de Linux y un protocolo criptográfico basado en Noise Framework, WireGuard elimina las fases lentas de negociación: los paquetes de datos comienzan a fluir de forma instantánea tan pronto como el primer datagrama UDP llega a la interfaz.'
        ]
      },
      {
        id: 'topologia-mesh-tailscale',
        title: '2. Topologías Mesh Punto a Punto y Perforación de NAT (NAT Traversal)',
        paragraphs: [
          'En una VPN tradicional en estrella (Hub-and-Spoke), si un servidor en la oficina de Tokio quiere comunicarse con un nodo en Frankfurt, todo el tráfico debe viajar primero a través del concentrador central en Virginia, añadiendo cientos de milisegundos de latencia inútil.',
          'Tailscale construye una red de malla coordinada: utiliza servidores STUN para descubrir las direcciones IP públicas de los extremos y perfora los routers NAT mediante técnicas avanzadas de UDP hole-punching. Los dos servidores establecen una conexión directa punto a punto (P2P) con cifrado de extremo a extremo.'
        ],
        table: {
          headers: ['Protocolo / Solución', 'Throughput Sostenido (1 Gbps link)', 'Uso de CPU', 'Líneas de Código'],
          rows: [
            ['OpenVPN (Modo TCP/UDP)', '240 Mbps', 'Elevado (Espacio de usuario)', '> 120,000 líneas'],
            ['IPsec / IKEv2', '680 Mbps', 'Medio', '> 400,000 líneas'],
            ['WireGuard Nativo (Kernel)', '940 Mbps (Línea casi pura)', 'Mínimo (Criptografía SIMD)', '~4,000 líneas'],
            ['Tailscale Mesh P2P', '920 Mbps', 'Bajo', 'Orquestado sobre WireGuard']
          ]
        }
      }
    ]
  }
];
