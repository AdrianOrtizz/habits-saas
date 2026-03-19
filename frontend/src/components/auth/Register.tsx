"use client";
import { Form, Input, Button, Typography, Card, Divider, Checkbox } from "antd";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Eliminamos confirmPassword antes de enviar al backend
    const { confirmPassword, ...registerData } = values;
    console.log("Datos para el registro en NestJS:", registerData);
    // Próximamente: Mutation de TanStack Query para POST /auth/register
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-[460px] shadow-xl border-none rounded-2xl p-4 md:p-6">
        <div className="text-center mb-8">
          <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <Title level={2} className="!m-0">
            Crear cuenta
          </Title>
          <Text type="secondary">Empezá a trackear tus hábitos hoy mismo.</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
          className="space-y-1"
        >
          <Form.Item
            name="name"
            label="Nombre completo"
            rules={[{ required: true, message: "¿Cómo te llamas?" }]}
          >
            <Input
              prefix={<User size={18} className="text-gray-400 mr-2" />}
              placeholder="Juan Pérez"
              className="rounded-layout"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: "El email es obligatorio" },
              { type: "email", message: "Ingresá un formato de email válido" },
            ]}
          >
            <Input
              prefix={<Mail size={18} className="text-gray-400 mr-2" />}
              placeholder="tu@email.com"
              className="rounded-layout"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: "Requerido" },
                { min: 6, message: "Mínimo 6 caracteres" },
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} className="text-gray-400 mr-2" />}
                placeholder="••••••••"
                className="rounded-layout"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmar"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Requerido" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("No coinciden"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock size={18} className="text-gray-400 mr-2" />}
                placeholder="••••••••"
                className="rounded-layout"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Debes aceptar los términos")),
              },
            ]}
          >
            <Checkbox className="text-[11px] leading-tight">
              Acepto los{" "}
              <Link
                href="#"
                className="text-primary font-medium hover:underline"
              >
                Términos de Servicio
              </Link>{" "}
              y la{" "}
              <Link
                href="#"
                className="text-primary font-medium hover:underline"
              >
                Política de Privacidad
              </Link>
              .
            </Checkbox>
          </Form.Item>

          <Form.Item className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-primary hover:!bg-emerald-600 rounded-layout font-bold flex items-center justify-center gap-2"
            >
              Registrarme <ArrowRight size={18} />
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Text type="secondary" className="text-sm">
            ¿Ya tenés una cuenta?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Iniciá sesión
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
