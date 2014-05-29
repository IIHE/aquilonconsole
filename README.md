Aquilon Console
===============

The Aquilon Console provides a web based interface to Aquilon providing a 
command A-Z and tools to optimise workflow.


Software
========

 * CherryPy 3.1.1 + Jinja2
 * Apache 2.2.15 + mod_wsgi
 * Bootstrap 3.1.1
 * jQuery 1.11.0
 * lessc 1.7.0 or greater (for css modifications)


Deployment
==========

1- Install required software

* `yum install httpd git python-setuptools mod_wsgi`
* `easy_install cherrypy jinja2`
* `git clone https://github.com/amazerfrazer/aquilonconsole.git`

2- Copy the vhost-aquilon.conf to your Apache config directory (eg. /etc/http/conf.d/)
   and replace the following:

 * AQ_URL - URL of you Aquilon server (including port)
 * AQ_DIR - the absolute path of this directory

3- Restart Apache. Done.
