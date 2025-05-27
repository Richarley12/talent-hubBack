import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ example: 12, description: 'Total de registros' })
  count: number;

  @ApiProperty({ example: 2, description: 'Página actual' })
  index: number;

  @ApiProperty({ example: 5, description: 'Cantidad por página' })
  limit: number;

  @ApiProperty({ example: 3, description: 'Última página disponible' })
  lastPage: number;
}

export class PaginationResultDto<T> {
  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ isArray: true })
  data: T[];

  constructor(data: T[], count: number, index: number, limit: number) {
    this.data = data;
    this.meta = {
      count,
      index,
      limit,
      lastPage: Math.ceil(count / limit),
    };
  }
}
