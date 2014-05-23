from pyramid.view import view_config

@view_config(route_name='index', renderer='index.jinja2')
def index(request):
    return {}

@view_config(route_name='hosts', renderer='hosts.jinja2')
def hosts(request):
    return {}

@view_config(route_name='personalities', renderer='personalities.jinja2')
def personalities(request):
    return {}

@view_config(route_name='az', renderer='az.jinja2')
def az(request):
    return {}
