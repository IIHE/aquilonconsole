import cherrypy
import os
from jinja2 import Environment, FileSystemLoader

aq_dir = os.path.dirname(os.path.abspath(__file__))
env = Environment(loader=FileSystemLoader(aq_dir))

class Root(object):
    @cherrypy.expose
    def index(request):
        tmpl = env.get_template('templates/index.html')
        return tmpl.render()
    
    @cherrypy.expose
    def hosts(request):
        tmpl = env.get_template('templates/hosts.html')
        return tmpl.render()
    
    @cherrypy.expose
    def personalities(request):
        tmpl = env.get_template('templates/personalities.html')
        return tmpl.render()
    
    @cherrypy.expose
    def az(request):
        tmpl = env.get_template('templates/az.html')
        return tmpl.render()

rootconf = {
    '/assets': {
        'tools.staticdir.on': True, 
        'tools.staticdir.dir': aq_dir + '/assets'
    }
}

cherrypy.tree.mount(Root(), "/", rootconf)
application = cherrypy.tree