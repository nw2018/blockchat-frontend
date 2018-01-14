from subprocess import call

call(['npm','run','build'])
call(['rsync','-avzhe','ssh','dist/','hao@vul.haoxp.xyz:/home/hao/block_chat'])