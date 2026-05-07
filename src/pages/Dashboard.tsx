import { useEffect, useState } from 'react';
import { Menu, X, LayoutDashboard, Users, Settings, Wrench, LogOut } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const getTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/transactions':
      return 'Transações';
    default:
      return '';
  }
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
    { icon: Users, label: 'Clientes', href: '#' },
    { icon: Wrench, label: 'Manutenção', href: '#' },
    { icon: Settings, label: 'Configurações', href: '#' },
  ];

  const title = getTitle(location.pathname);

  if (!user) {
    navigate('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Topbar (visível apenas em telas menores) */}
      <div className="fixed top-0 z-40 flex w-full items-center border-b border-gray-200 bg-white p-4 shadow-sm md:hidden">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-md bg-gray-100 p-2 transition-colors hover:bg-gray-200 focus:outline-none"
          aria-label="Abrir menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <h1 className="ml-2 text-xl font-medium">{title}</h1>
      </div>

      {/* Overlay Escuro para Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Navigation Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out md:relative md:flex md:translate-x-0 md:flex-col md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-5 md:justify-center">
          {/* <span className="text-2xl font-black tracking-tight text-indigo-600">Logo App</span> */}
          <Logo />
          {/* Botão de Fechar (visível apenas no Mobile) */}
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 md:hidden"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="group flex items-center space-x-3 rounded-lg p-3 font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Icon
                  size={20}
                  className="text-gray-400 transition-colors group-hover:text-indigo-600"
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Footer da Sidebar (opcional, para perfil ou logout) */}
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            className="flex w-full items-center space-x-3 rounded-lg p-3 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={() => signOut()}
          >
            <LogOut />
            <span>Sair do sistema</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-6 pt-24 md:p-8 md:pt-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">Visão Geral</h1>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-lg leading-relaxed text-gray-600">
              Redimensione a janela do navegador para ver o comportamento responsivo. Em telas a
              partir de `768px` (breakpoint `md`), a sidebar empurra o conteúdo e fica fixa. Em
              telas menores, ela se esconde na esquerda e um menu superior aparece com um botão
              hamburguer para acionar a drawer.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
