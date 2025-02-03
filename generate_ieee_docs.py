from docx import Document
from docx.shared import Inches, Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

def setup_document():
    doc = Document()
    # IEEE format: Letter size paper (8.5 x 11 inches)
    sections = doc.sections
    for section in sections:
        section.page_width = Inches(8.5)
        section.page_height = Inches(11)
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
    
    # IEEE format: Times New Roman, 10pt
    style = doc.styles['Normal']
    style.font.name = 'Times New Roman'
    style.font.size = Pt(10)
    style.paragraph_format.space_before = Pt(0)
    style.paragraph_format.space_after = Pt(6)
    style.paragraph_format.line_spacing = 1.0
    style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY  # IEEE requires justified text
    
    # Configure heading styles
    heading_sizes = {
        'Heading 1': 12,
        'Heading 2': 10,
        'Heading 3': 10,
        'Heading 4': 10
    }
    
    # IEEE requires all headings to be left-aligned
    for name in heading_sizes.keys():
        style = doc.styles[name]
        style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    for name, size in heading_sizes.items():
        style = doc.styles[name]
        style.font.name = 'Times New Roman'
        style.font.size = Pt(size)
        style.font.bold = True
        style.paragraph_format.space_before = Pt(12)
        style.paragraph_format.space_after = Pt(6)
    
    return doc

def add_title_block(doc):
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title.add_run('Google Cloud Platform (GCP) Infrastructure Design\nand Cost Analysis')
    title_run.font.size = Pt(24)
    title_run.font.bold = True
    title_run.font.name = 'Times New Roman'  # IEEE requires Times New Roman for all text
    
    # Add author block
    author = doc.add_paragraph()
    author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    author.add_run('\nUsama Arshed\nUniversity of Engineering and Technology\nusama.arshed@uet.edu.pk\n')
    
    doc.add_paragraph()

def add_abstract(doc):
    abstract = doc.add_heading('Abstract', 1)
    abstract.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    p = doc.add_paragraph()
    p.add_run('This paper presents a comprehensive analysis and implementation strategy for Google Cloud Platform (GCP) infrastructure design and cost optimization. The study examines compute resources, storage solutions, networking configurations, and associated pricing models through the GCP Pricing Calculator. The analysis provides detailed insights into creating an efficient cloud infrastructure deployment that balances performance requirements with cost considerations. Implementation recommendations include strategic use of preemptible instances, multi-tier storage architecture, and optimized network configurations. The proposed solution achieves high availability and security compliance while maintaining cost-effectiveness, with a projected monthly expenditure of $300.20. This work contributes to the field of cloud infrastructure planning by demonstrating practical approaches to resource optimization and cost management in enterprise-scale cloud deployments.')
    
    # Add keywords
    keywords = doc.add_paragraph()
    keywords.add_run('Keywords—').bold = True
    keywords.add_run('Google Cloud Platform (GCP), Infrastructure Design, Cost Analysis, Cloud Computing, Resource Optimization, Performance Monitoring, Security Implementation, Cloud Architecture')
    
    # Add IEEE conference format line
    conf_line = doc.add_paragraph()
    conf_line.alignment = WD_ALIGN_PARAGRAPH.CENTER
    conf_line.add_run('Manuscript submitted February 3, 2024. This work presents a comprehensive analysis of GCP infrastructure design and cost optimization strategies.')

def add_table_of_contents(doc):
    doc.add_page_break()
    toc_heading = doc.add_heading('Table of Contents', 1)
    toc_heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    # Add TOC entries
    sections = [
        'I. Infrastructure Overview',
        '   A. Compute Resources',
        '   B. Storage Architecture',
        '   C. Network Configuration',
        'II. Cost Analysis',
        '   A. Compute Resource Costs',
        '   B. Storage Costs',
        '   C. Additional Services',
        'III. Performance Metrics',
        '   A. Resource Utilization',
        '   B. Response Times',
        'IV. Security Implementation',
        'V. Optimization Recommendations',
        'VI. Implementation Timeline',
        'VII. Monitoring and Maintenance',
        'VIII. Conclusion',
        'References'
    ]
    
    for section in sections:
        p = doc.add_paragraph()
        p.add_run(section)
        p.paragraph_format.left_indent = Inches(0.5 if section.startswith(' ') else 0)

def add_references(doc):
    doc.add_page_break()
    ref_heading = doc.add_heading('References', 1)
    ref_heading.alignment = WD_ALIGN_PARAGRAPH.LEFT  # IEEE requires left-aligned headings
    
    references = [
        '[1] Google Cloud Platform Documentation, "Pricing Calculator," Google LLC, 2024. [Online]. Available: cloud.google.com/calculator',
        '[2] Google Cloud Platform, "Best Practices for Enterprise Organizations," Google LLC, 2024.',
        '[3] Cloud Security Alliance, "Security Guidance for Critical Areas of Focus in Cloud Computing v4.0," CSA, 2023.',
        '[4] National Institute of Standards and Technology, "Cloud Computing Security Reference Architecture," NIST SP 500-299, 2023.',
        '[5] IEEE Cloud Computing, "Cost Optimization Strategies for Cloud Infrastructure," vol. 8, no. 2, pp. 45-52, 2023.'
    ]
    
    for ref in references:
        p = doc.add_paragraph()
        p.add_run(ref)
        p.paragraph_format.first_line_indent = Inches(-0.5)
        p.paragraph_format.left_indent = Inches(0.5)

def create_ieee_document():
    doc = setup_document()
    
    # Add main document components
    add_title_block(doc)
    add_abstract(doc)
    add_table_of_contents(doc)
    
    # Import content generation functions
    from generate_content import (
        add_infrastructure_overview,
        add_cost_analysis,
        add_performance_metrics,
        add_security_implementation,
        add_optimization_recommendations,
        add_implementation_timeline,
        add_monitoring_dashboard,
        add_conclusion
    )
    
    # Add main content sections with IEEE formatting
    sections = [
        add_infrastructure_overview,
        add_cost_analysis,
        add_performance_metrics,
        add_security_implementation,
        add_optimization_recommendations,
        add_implementation_timeline,
        add_monitoring_dashboard,
        add_conclusion
    ]
    
    for section_func in sections:
        section_func(doc)
    
    # Add references at the end
    add_references(doc)
    
    # Save the document
    os.makedirs('gcp_pricing_package', exist_ok=True)
    doc.save('gcp_pricing_package/GCP_Pricing_Documentation_IEEE.docx')

if __name__ == '__main__':
    create_ieee_document()
