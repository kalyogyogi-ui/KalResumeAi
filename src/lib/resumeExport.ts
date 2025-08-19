import puppeteer from 'puppeteer';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    website?: string;
    profilePhoto?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    honors?: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: Array<{ name: string; proficiency: string }>;
    certifications: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
  }>;
  awards?: string[];
  publications?: string[];
}

export class ResumeExportService {
  // Export to PDF using HTML template
  async exportToPDF(resumeData: ResumeData, template: string = 'modern'): Promise<Buffer> {
    const htmlContent = this.generateHTMLContent(resumeData, template);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });
    
    await browser.close();
    return pdfBuffer;
  }

  // Export to Word Document (DOCX)
  async exportToWord(resumeData: ResumeData): Promise<Buffer> {
    // This would require a library like 'docx' for proper Word document generation
    // For now, we'll create an RTF format which is compatible with Word
    const rtfContent = this.generateRTFContent(resumeData);
    return Buffer.from(rtfContent, 'utf-8');
  }

  // Export to JSON
  exportToJSON(resumeData: ResumeData): string {
    return JSON.stringify(resumeData, null, 2);
  }

  // Export to Excel
  async exportToExcel(resumeData: ResumeData): Promise<Buffer> {
    const workbook = XLSX.utils.book_new();
    
    // Personal Info Sheet
    const personalInfoSheet = XLSX.utils.json_to_sheet([resumeData.personalInfo]);
    XLSX.utils.book_append_sheet(workbook, personalInfoSheet, 'Personal Info');
    
    // Experience Sheet
    const experienceSheet = XLSX.utils.json_to_sheet(resumeData.experience);
    XLSX.utils.book_append_sheet(workbook, experienceSheet, 'Experience');
    
    // Education Sheet
    const educationSheet = XLSX.utils.json_to_sheet(resumeData.education);
    XLSX.utils.book_append_sheet(workbook, educationSheet, 'Education');
    
    // Skills Sheet
    const skillsFlat = [
      { category: 'Technical', skills: resumeData.skills.technical.join(', ') },
      { category: 'Soft Skills', skills: resumeData.skills.soft.join(', ') },
      { category: 'Certifications', skills: resumeData.skills.certifications.join(', ') }
    ];
    const skillsSheet = XLSX.utils.json_to_sheet(skillsFlat);
    XLSX.utils.book_append_sheet(workbook, skillsSheet, 'Skills');
    
    // Projects Sheet
    const projectsSheet = XLSX.utils.json_to_sheet(resumeData.projects);
    XLSX.utils.book_append_sheet(workbook, projectsSheet, 'Projects');
    
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  // Export to LaTeX
  exportToLatex(resumeData: ResumeData): string {
    return this.generateLatexContent(resumeData);
  }

  // Generate HTML content for PDF export
  private generateHTMLContent(resumeData: ResumeData, template: string): string {
    const templates = {
      modern: this.modernTemplate(resumeData),
      classic: this.classicTemplate(resumeData),
      creative: this.creativeTemplate(resumeData),
      minimal: this.minimalTemplate(resumeData)
    };
    
    return templates[template as keyof typeof templates] || templates.modern;
  }

  private modernTemplate(data: ResumeData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Resume - ${data.personalInfo.fullName}</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background: #fff;
            }
            .container { max-width: 800px; margin: 0 auto; padding: 40px; }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 40px; 
                text-align: center; 
                margin: -40px -40px 40px -40px;
            }
            .header h1 { font-size: 2.5em; margin-bottom: 10px; font-weight: 300; }
            .contact-info { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
            .contact-info span { font-size: 0.9em; }
            .section { margin-bottom: 30px; }
            .section h2 { 
                color: #667eea; 
                border-bottom: 2px solid #667eea; 
                padding-bottom: 5px; 
                margin-bottom: 20px;
                font-size: 1.3em;
            }
            .summary { font-style: italic; color: #666; }
            .experience-item, .education-item, .project-item { 
                margin-bottom: 25px; 
                padding-bottom: 20px; 
                border-bottom: 1px solid #eee;
            }
            .experience-item:last-child, .education-item:last-child, .project-item:last-child { 
                border-bottom: none; 
            }
            .item-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .company, .institution, .project-name { font-weight: bold; color: #333; }
            .position, .degree, .technologies { color: #667eea; font-style: italic; }
            .date { color: #888; font-size: 0.9em; }
            .skills-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                gap: 20px; 
            }
            .skill-category h3 { color: #667eea; margin-bottom: 10px; }
            .skill-list { list-style: none; }
            .skill-list li { 
                background: #f8f9fa; 
                padding: 5px 10px; 
                margin: 3px 0; 
                border-radius: 15px; 
                font-size: 0.9em;
                display: inline-block;
                margin-right: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${data.personalInfo.fullName}</h1>
                <div class="contact-info">
                    <span>📧 ${data.personalInfo.email}</span>
                    <span>📱 ${data.personalInfo.phone}</span>
                    <span>📍 ${data.personalInfo.address}</span>
                    ${data.personalInfo.linkedin ? `<span>💼 LinkedIn</span>` : ''}
                    ${data.personalInfo.github ? `<span>💻 GitHub</span>` : ''}
                </div>
            </div>

            ${data.summary ? `
            <div class="section">
                <h2>Professional Summary</h2>
                <p class="summary">${data.summary}</p>
            </div>
            ` : ''}

            <div class="section">
                <h2>Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <div>
                                <div class="company">${exp.company}</div>
                                <div class="position">${exp.position}</div>
                            </div>
                            <div class="date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                        </div>
                        <p>${exp.description}</p>
                        ${exp.achievements.length > 0 ? `
                            <ul>
                                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <div class="institution">${edu.institution}</div>
                                <div class="degree">${edu.degree} in ${edu.field}</div>
                            </div>
                            <div class="date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                        </div>
                        ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                        ${edu.honors && edu.honors.length > 0 ? `
                            <p><strong>Honors:</strong> ${edu.honors.join(', ')}</p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2>Skills</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h3>Technical Skills</h3>
                        <ul class="skill-list">
                            ${data.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h3>Soft Skills</h3>
                        <ul class="skill-list">
                            ${data.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    ${data.skills.languages.length > 0 ? `
                    <div class="skill-category">
                        <h3>Languages</h3>
                        <ul class="skill-list">
                            ${data.skills.languages.map(lang => `<li>${lang.name} (${lang.proficiency})</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            </div>

            ${data.projects.length > 0 ? `
            <div class="section">
                <h2>Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <div class="project-name">${project.name}</div>
                        <div class="technologies">${project.technologies.join(', ')}</div>
                        <p>${project.description}</p>
                        ${project.url ? `<p><strong>URL:</strong> ${project.url}</p>` : ''}
                        ${project.github ? `<p><strong>GitHub:</strong> ${project.github}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    </body>
    </html>
    `;
  }

  private classicTemplate(data: ResumeData): string {
    // Classic professional template
    return this.modernTemplate(data).replace(
      'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      'background: #2c3e50;'
    );
  }

  private creativeTemplate(data: ResumeData): string {
    // Creative template with more colors and styling
    return this.modernTemplate(data).replace(
      'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      'background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1);'
    );
  }

  private minimalTemplate(data: ResumeData): string {
    // Minimal black and white template
    return this.modernTemplate(data).replace(
      'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      'background: #000;'
    );
  }

  private generateRTFContent(data: ResumeData): string {
    // RTF format for Word compatibility
    return `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 ${data.personalInfo.fullName}\\par
\\f0\\fs18 ${data.personalInfo.email} | ${data.personalInfo.phone}\\par
\\par
\\b PROFESSIONAL SUMMARY\\b0\\par
${data.summary}\\par
\\par
\\b EXPERIENCE\\b0\\par
${data.experience.map(exp => `
\\b ${exp.position}\\b0 at \\b ${exp.company}\\b0 (${exp.startDate} - ${exp.endDate || 'Present'})\\par
${exp.description}\\par
${exp.achievements.map(achievement => `• ${achievement}\\par`).join('')}
\\par
`).join('')}
}`;
  }

  private generateLatexContent(data: ResumeData): string {
    return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{margin=0.75in}

\\begin{document}

\\begin{center}
\\huge{\\textbf{${data.personalInfo.fullName}}}\\\\
\\large{${data.personalInfo.email} | ${data.personalInfo.phone}}\\\\
\\large{${data.personalInfo.address}}
\\end{center}

\\section*{Professional Summary}
${data.summary}

\\section*{Experience}
${data.experience.map(exp => `
\\textbf{${exp.position}} at \\textbf{${exp.company}} \\hfill ${exp.startDate} - ${exp.endDate || 'Present'}\\\\
${exp.description}
${exp.achievements.length > 0 ? `\\begin{itemize}
${exp.achievements.map(achievement => `\\item ${achievement}`).join('\n')}
\\end{itemize}` : ''}
`).join('')}

\\section*{Education}
${data.education.map(edu => `
\\textbf{${edu.degree} in ${edu.field}}\\\\
${edu.institution} \\hfill ${edu.startDate} - ${edu.endDate || 'Present'}
${edu.gpa ? `\\\\GPA: ${edu.gpa}` : ''}
`).join('')}

\\end{document}`;
  }

  // ATS-friendly plain text export
  exportToATS(resumeData: ResumeData): string {
    return `
${resumeData.personalInfo.fullName}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}
${resumeData.personalInfo.address}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.position} - ${exp.company}
${exp.startDate} to ${exp.endDate || 'Present'}
${exp.description}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} in ${edu.field}
${edu.institution}
${edu.startDate} to ${edu.endDate || 'Present'}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n')}

TECHNICAL SKILLS
${resumeData.skills.technical.join(', ')}

SOFT SKILLS
${resumeData.skills.soft.join(', ')}
    `.trim();
  }
}

export const resumeExportService = new ResumeExportService();
export default resumeExportService;