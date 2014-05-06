Aquilon Console
===============

The Aquilon Console provides a web based interface to Aquilon providing a 
command A-Z and tools to optimise workflow.


Software
========

 * Pyramid 1.5b1
 * Apache 2.2.15
 * Bootstrap 3.1.1
 * jQuery 1.11.0
 * lessc 1.7.0 or greater (for css modifications)


Deployment
==========

1. Copy the vhost-aquilon.conf to your Apache config directory (eg. /etc/http/conf.d/)
   and replace the following:

 * HOSTNAME   - hostname of machine that will run the Aquilon Console
 * USER       - user to run the Aquilon Console under (root not allowed)
 * GROUP      - group to run the Aquilon Console under (root not allowed)
 * AQUILONURL - URL of you Aquilon server (including port)
 * AQ_DIR     - the full path of this directory

2. Replace the following in aquilonconsole.wsgi:

 * AQ_DIR     - the full path of this directory
