@echo off
@color F0
@title KMS 1.2.391
set CLASSPATH=.;dist\*;dist\lib\*;lib\*
java -Xms4G -Xmx16G -Dnet.sf.odinms.wzpath=wz server.Start
pause