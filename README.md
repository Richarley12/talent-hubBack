# TalentHub - Backend API

TalentHub es una plataforma de gestión de recursos humanos que permite a empresas cliente administrar empleados, departamentos y reportes, todo de forma segura a través de una API RESTful construida en NestJS y Prisma.

---

## Tecnologías Usadas

* **Framework**: NestJS
* **ORM**: Prisma
* **Base de Datos**: PostgreSQL
* **Autenticación**: JWT
* **Lenguaje**: TypeScript
* **Procesamiento de Archivos**: Excel (xlsx) (pendiente)

---

## Requisitos

* Node.js v18+
* PostgreSQL (configurado y corriendo)
* npm / yarn

---

## Instalación

```bash
git clone pendiente
cd talenthub-api
npm install
```

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="postgresql://userdb:passwaordb@localhost:5432/namedb"
PORT=3000
JWT_SECRET=nameproject
KEY_CRYPTO=hexadecilcharacter(16)
IV_CRYPTO=hexadecilcharacter(8)
```
---

## Comandos últiles

### Compilar y levantar el proyecto:

```bash
npm run start:dev
```

### Ejecutar migraciones de Prisma:

```bash
npx prisma migrate dev --name init
```

### Generar cliente de Prisma:

```bash
npx prisma generate
```

### Visualizar la documentación Swagger:

```
http://localhost:3045/api-docs
```

---

## Estructura de la base de datos

Una vez montadas las Base de datos, se debe correr el query de triggers para los logs en el archivo triggers.sql

```prisma
model Company {
  id                  String            @id @default(uuid())
  commercialName      String
  nit                 String            @unique
  address             String
  description         String?
  cellPhoneNumber     String
  dateCreation        DateTime          @default(now())
  eliminated          Boolean           @default(false)
  listStatesCompanyId Int
  accountUsers        AccountUser[]
  listStatesCompany   ListStatesCompany @relation(fields: [listStatesCompanyId], references: [id])
  departments         Department[]
  employees           Employee[]
}

model ListStatesCompany {
  id          Int       @id @default(autoincrement())
  statusName  String
  description String?
  eliminated  Boolean   @default(false)
  companies   Company[]
}

model Department {
  id           Int                    @id @default(autoincrement())
  name         String
  description  String?
  creationDate DateTime               @default(now())
  eliminated   Boolean                @default(false)
  companyId    String
  company      Company                @relation(fields: [companyId], references: [id])
  employees    Employee[]
  logs         LogsUpdateDepartment[]
}

model Employee {
  id              Int                              @id @default(autoincrement())
  departmentId    Int
  companyId       String
  position        String
  identificationNumber  String                           @unique
  email           String
  firstName       String
  lastName        String
  address         String
  cellPhoneNumber String
  dateCreation    DateTime                         @default(now())
  state           Boolean                          @default(true)
  eliminated      Boolean                          @default(false)
  account         AccountUser?
  company         Company                          @relation(fields: [companyId], references: [id])
  department      Department                       @relation(fields: [departmentId], references: [id])
  changes         LogsDepartmentChangeByEmployee[]
  logs            LogsUpdateemployee[]
  @@unique([email, companyId])

}

model AccountUser {
  id           String                 @id @default(uuid())
  email        String                 @unique
  resetKey     String?
  creationDate DateTime               @default(now())
  state        Boolean                @default(true)
  companyId    String
  employeeId   Int?                   @unique
  company      Company                @relation(fields: [companyId], references: [id])
  employee     Employee?              @relation(fields: [employeeId], references: [id])
  credential   AccountUserCredential?
}

model AccountUserCredential {
  id            Int         @id @default(autoincrement())
  password      String
  accountUserId String      @unique
  accountUser   AccountUser @relation(fields: [accountUserId], references: [id])
}

model LogsUpdateemployee {
  id               Int      @id @default(autoincrement())
  employeeId       Int
  modificationDate DateTime
  modifiedColumn   String
  previousData     String?
  newData          String?
  employee         Employee @relation(fields: [employeeId], references: [id])
}

model LogsUpdateDepartment {
  id               Int        @id @default(autoincrement())
  departmentId     Int
  modificationDate DateTime
  modifiedColumn   String
  previousData     String?
  newData          String?
  department       Department @relation(fields: [departmentId], references: [id])
}

model LogsDepartmentChangeByEmployee {
  id                   Int      @id @default(autoincrement())
  modificationDate     DateTime
  previousDepartmentId Int
  newDepartmentId      Int
  employeeId           Int
  employee             Employee @relation(fields: [employeeId], references: [id])
}
```

---

## 🔍 Endpoints principales

### Autenticación

```
POST /auth/register     # Registro de empresa
POST /auth/login        # Login (retorna JWT)
```

### Departamentos (protegido por JWT)

```
GET    /departments            # Listar departamentos de la empresa
POST   /departments            # Crear nuevo departamento
PATCH  /departments/:id        # Actualizar departamento
DELETE /departments/:id        # Eliminación lógica
```

### Empleados (protegido por JWT)

```
GET    /employees              # Listar empleados con filtros (estado, fechas, departamento)
POST   /employees              # Crear nuevo empleado
PATCH  /employees/:id         # Actualizar empleado
DELETE /employees/:id         # Eliminación lógica
POST   /employees/upload       # Carga masiva desde Excel (pendiente)
```
---

## Ejemplo de uso

### Login y uso de token

1. Hacer login:

```json
POST /auth/login
{
  "email": "admin@empresa.com",
  "password": "123456"
}
```

2. Respuesta:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1..."
}
```

3. Usar el token en Swagger o en Postman:

```http
Authorization: Bearer {accessToken}
```

---

## 🛡️ Seguridad y validaciones

* Todas las rutas protegidas requieren JWT
* Cada empresa solo puede acceder a sus propios departamentos y empleados
* Validaciones automáticas con `class-validator`
* Emails únicos por empresa
* No se permiten accesos cruzados entre empresas

---

## 🚧 Pendiente

* Endpoint para carga masiva desde Excel
* Cargas automaticas de logs
* Auditoría automática desde triggers SQL

---

## 🚀 Autor

**Richar Cifuentes**
