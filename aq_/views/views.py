from pyramid.view import view_config

@view_config(route_name='index', renderer='index.jinja2')
def index(request):
    return {'project': 'Aq_'}


@view_config(route_name='commands', renderer='commands.jinja2')
def commands(request):
    return {'project': 'Aq_'}
