import markdown
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

# Convert markdown to HTML
with open('USWMusicals_Poster.md', 'r') as f:
    md_content = f.read()

html_content = markdown.markdown(md_content, extensions=['fenced_code'])

# Add CSS styling for A1 format and professional layout
css_content = '''
@page {
    size: 841mm 594mm; /* A1 landscape */
    margin: 25mm;
    @top-center {
        content: "USW Musicals Booking System";
        font-size: 24pt;
        color: #333;
    }
}
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    column-count: 3;
    column-gap: 40px;
    background-color: #ffffff;
    color: #333333;
}
h1 {
    column-span: all;
    text-align: center;
    font-size: 60pt;
    margin-bottom: 40px;
    color: #1a237e;
    border-bottom: 4px solid #1a237e;
    padding-bottom: 20px;
}
h2 {
    font-size: 40pt;
    margin-top: 30px;
    color: #1a237e;
    break-after: avoid;
}
h3 {
    font-size: 28pt;
    color: #283593;
    break-after: avoid;
}
p, li {
    font-size: 18pt;
    text-align: justify;
    hyphens: auto;
}
pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    font-size: 16pt;
    white-space: pre-wrap;
    border: 1px solid #e0e0e0;
    margin: 10px 0;
}
code {
    font-family: 'Consolas', monospace;
    background-color: #f5f5f5;
    padding: 2px 5px;
    border-radius: 3px;
}
ul, ol {
    margin-left: 20px;
    padding-left: 20px;
}
.header {
    column-span: all;
    text-align: center;
    margin-bottom: 40px;
}
.module-info {
    font-size: 24pt;
    color: #283593;
    margin-bottom: 20px;
}
'''

# Generate PDF
font_config = FontConfiguration()
html = HTML(string=f'''
    <html>
        <head>
            <style>{css_content}</style>
        </head>
        <body>{html_content}</body>
    </html>
''')

html.write_pdf(
    'USWMusicals_Poster.pdf',
    font_config=font_config,
    presentational_hints=True
)
