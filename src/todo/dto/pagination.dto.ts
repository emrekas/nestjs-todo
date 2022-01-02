import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  pageNumber: number;

  @IsOptional()
  @IsPositive()
  nPerPage: number;
}
