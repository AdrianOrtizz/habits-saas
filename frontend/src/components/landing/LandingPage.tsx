import Link from "next/link";
import { Button, Card } from "antd";
import { RocketOutlined, CheckCircleOutlined } from "@ant-design/icons";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Habitzz</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button type="text" className="font-medium">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button type="primary" className="rounded-full px-6 bg-primary">
              Probar gratis
            </Button>
          </Link>
        </div>
      </nav>

      <header className="px-6 pt-16 pb-24 max-w-5xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide  uppercase bg-blue-50 rounded-full">
          Productividad nivel Pro
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
          Domina tus días, <br />
          <span className="text-primary">conquista tus metas.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          La plataforma simple y potente para trackear tus hábitos, alcanzar tus
          objetivos semanales y visualizar tu progreso real.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              type="primary"
              size="large"
              className="h-14 px-10 rounded-xl text-lg font-bold! bg-primary shadow-xl shadow-blue-200"
            >
              Empezar ahora — Es gratis
            </Button>
          </Link>
        </div>
      </header>

      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <FeatureCard
            icon={<CheckCircleOutlined className="text-3xl text-blue-500" />}
            title="Hábitos Flexibles"
            desc="Diarios, semanales o días específicos. Habitzz se adapta a tu rutina, no al revés."
          />
          <FeatureCard
            icon={<RocketOutlined className="text-3xl text-purple-500" />}
            title="Objetivos Semanales"
            desc="Enfócate en lo que importa cada semana y sentí la satisfacción de marcar 'Completado'."
          />
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 Habitzz. Hecho para gente que hace.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <Card className="shadow-md! transition-shadow!">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </Card>
);
