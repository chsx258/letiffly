/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-05
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import { defaultUserProperties } from "@ly-letitfly/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserPropertyProps {
  id: string;
  coins?: number;
  paperCraneStyles?: string[];
}

interface UserPropertyDocument extends Document {
  id: string;
  coins: number;
  paperCraneStyles: string[];
}

interface UserPropertyModel extends Model<UserPropertyDocument> {
  build(props: UserPropertyProps): UserPropertyDocument;
}

const userPropertySchema = new Schema(
  {
    coins: {
      type: Number,
      required: true,
      default: defaultUserProperties.coins,
    },
    paperCraneStyles: {
      type: [mongoose.Schema.Types.ObjectId],
      default: defaultUserProperties.paperCraneStyles,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      versionKey: false,
    },
  }
);
userPropertySchema.plugin(updateIfCurrentPlugin);

const build = (props: UserPropertyProps) => {
  const userProperty: any = { _id: props.id, ...props };
  delete userProperty.id;
  return new UserProperty(userProperty);
};
userPropertySchema.static("build", build);

const UserProperty = mongoose.model<UserPropertyDocument, UserPropertyModel>(
  "User",
  userPropertySchema
);
export { UserProperty };
