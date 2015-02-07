for var in "$@"
do
    iconv -f UTF-8 -t UTF-16 $var > "$var.tmp"
    rm -f $var
    mv "$var.tmp" $var    
done

