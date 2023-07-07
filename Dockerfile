FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && \
 apt-get -y install apache2 net-tools curl vim

# Install apache and write hello world message
#RUN echo "<br> <h1> Hello World! From docker container hosted in an AWS instance </h1> <br> <br> <h3> Dr . Rizk's Team </h3>" > /var/www/html/index.html
COPY index.html /var/www/html/index.html

# Configure apache
RUN echo 'echo "<h1> IP = $(ifconfig | grep -i net | cut -f10 -d" " | head -n 1)</h1>" >> /var/www/html/index.html' > /root/run_apache.sh && \
 echo 'echo "<br>" >> /var/www/html/index.html' >> /root/run_apache.sh && \
 echo 'echo "<br>" >> /var/www/html/index.html' >> /root/run_apache.sh && \
 echo 'echo "<br>" >> /var/www/html/index.html' >> /root/run_apache.sh && \ 
 echo 'echo "<br>" >> /var/www/html/index.html' >> /root/run_apache.sh && \ 
 echo 'echo "<h5>Dr.Rizq s Team</h5>" >> /var/www/html/index.html' >> /root/run_apache.sh && \ 
 echo '. /etc/apache2/envvars' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/run/apache2' >> /root/run_apache.sh && \
 echo 'mkdir -p /var/lock/apache2' >> /root/run_apache.sh && \
 echo '/usr/sbin/apache2 -D FOREGROUND' >> /root/run_apache.sh && \
 chmod 755 /root/run_apache.sh

EXPOSE 80

CMD /root/run_apache.sh