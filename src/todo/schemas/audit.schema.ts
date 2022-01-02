import { Prop, Schema } from '@nestjs/mongoose';

export type TodoDocument = Audit & Document;

@Schema()
export class Audit {
  @Prop({ required: true })
  createdBy: number;

  @Prop({ required: true })
  created: Date;

  @Prop()
  modifiedBy?: number;

  @Prop()
  modified?: Date;
}
