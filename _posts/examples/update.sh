for i in *.html; do
    sed -i '' 's/layout: example/template: example.html/g' $i
done
