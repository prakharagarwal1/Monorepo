# Services & Repositories

## Service Pattern

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  constructor(private readonly repository: StudentsRepository) {}

  findAll() { return this.repository.findAll(); }
  findOne(id: string) { return this.repository.findOne(id); }
  create dto: CreateStudentDto) { return this.repository.create(dto); }
}
```

## Repository Pattern

- Each service has an in-memory repository in `data.ts`
- Repositories implement basic CRUD operations
- Replace the in-memory implementation with a database adapter (TypeORM, Prisma, etc.) when persistence is required
- Keep the repository interface stable so services do not change when the adapter is swapped

## Validation

- Use `class-validator` decorators in DTOs (`@IsString()`, `@IsEmail()`, etc.)
- Enable global validation pipes in `main.ts` with `app.useGlobalPipes(new ValidationPipe())`
