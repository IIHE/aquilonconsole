from pyramid.view import view_config

@view_config(route_name='index', renderer='index.jinja2')
def index(request):
    return {}

@view_config(route_name='manage', renderer='manage.jinja2')
def manage(request):
    return {}

@view_config(route_name='commands', renderer='commands.jinja2')
def commands(request):
    return {}
