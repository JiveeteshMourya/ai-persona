import z from "zod";

export const chatSchema = z.object({
  chatType: z.enum(["hitesh-sir", "piyush-sir", "jiveetesh"]),
  chatMsg: z.string().max(200),
});
