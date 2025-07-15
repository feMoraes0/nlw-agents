import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no minimo 3 caracteres" }),
  description: z.string(),
});

type CreateRoomFormType = z.infer<typeof createRoomSchema>;

const CreateRoomForm = () => {
  const createRoomForm = useForm<CreateRoomFormType>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreateRoom = (data: CreateRoomFormType) => console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma sala para começar a fazer perguntar e receber uma resposta da
          I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição:</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            ></FormField>
            <Button type="submit" className="w-full">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateRoomForm;
