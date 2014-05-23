from pyramid.config import Configurator

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('assets', 'assets', cache_max_age=3600)
    config.add_route('index', '/')
    config.add_route('hosts', '/hosts')
    config.add_route('personalities', '/personalities')
    config.add_route('az', '/az')
    config.scan()
    return config.make_wsgi_app()
