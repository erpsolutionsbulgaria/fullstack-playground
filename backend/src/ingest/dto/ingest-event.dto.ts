import { IsISO8601, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class IngestEventDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsISO8601()
  occurredAt: string;

  @IsObject()
  properties: Record<string, unknown>;
}