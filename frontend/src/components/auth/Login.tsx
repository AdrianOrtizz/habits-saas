"use client";
import { Form, Input, Button, Typography, Checkbox, Card, Divider } from "antd";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

const { Title, Text } = Typography;

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log("Datos de login para la API:", values);
    // Aquí integraremos el fetch al backend de NestJS próximamente
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[420px] shadow-xl border-none rounded-2xl p-4 md:p-6">
        <div className="text-center mb-8">
          <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary text-3xl font-bold italic">H</span>
          </div>
          <Title level={2} className="!m-0">
            ¡Hola de nuevo!
          </Title>
          <Text type="secondary">Ingresá para seguir con tus hábitos.</Text>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              {
                required: true,
                type: "email",
                message: "Ingresá un email válido",
              },
            ]}
          >
            <Input
              prefix={<Mail size={18} className="text-gray-400 mr-2" />}
              placeholder="tu@email.com"
              className="rounded-layout"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "La contraseña es obligatoria" },
            ]}
          >
            <Input.Password
              prefix={<Lock size={18} className="text-gray-400 mr-2" />}
              placeholder="••••••••"
              className="rounded-layout"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-xs">Recordarme</Checkbox>
            </Form.Item>
            <Link
              href="#"
              className="text-xs text-primary hover:underline font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-primary hover:!bg-emerald-600 rounded-layout font-bold flex items-center justify-center gap-2"
            >
              Iniciar Sesión <ArrowRight size={18} />
            </Button>
          </Form.Item>
        </Form>

        <Divider plain className="text-gray-400 text-xs my-8">
          O continúa con
        </Divider>

        <div className="text-center">
          <Text type="secondary" className="text-sm">
            ¿No tenés una cuenta?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Registrate gratis
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
