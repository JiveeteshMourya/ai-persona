import { z } from "zod";
import { chatSchema } from "../common/utils/validationSchemas.js";
import { chatService } from "../services/chatServices.js";
import ServerError from "../common/errors/ServerError.js";
import ServerResponse from "../common/utils/ServerResponse.js";

export const chatController = async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ServerError(400, z.flattenError(parsed.error));
  }

  const response = await chatService(parsed.data.chatMsg, parsed.data.chatType);
  return res
    .status(200)
    .json(
      new ServerResponse(
        200,
        { chatType: parsed.data.chatType, response },
        "AI Persona replied sucessfully"
      )
    );
};
