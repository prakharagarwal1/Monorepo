# Routing & Controllers

## Controller Pattern

```typescript
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";

@Controller("students")
export class StudentsController {
  @Get()
  findAll() {
    /* ... */
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    /* ... */
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    /* ... */
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    /* ... */
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    /* ... */
  }
}
```

## Rules

- One controller per resource
- Use DTOs for `@Body()` parameters
- Use `@Param()` with a typed name for path parameters
- Return plain objects; NestJS serializes them automatically
- Use `@HttpCode()` or `@HttpStatus()` for non-default status codes
