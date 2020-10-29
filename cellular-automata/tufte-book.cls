\NeedsTeXFormat{LaTeX2e}[1994/06/01]

\ProvidesClass{tufte-book}[2015/06/21 v3.5.2 Tufte-book class]

%%
% Declare we're tufte-book
\newcommand{\@tufte@class}{book}% the base LaTeX class (defaults to the article/handout style)
\newcommand{\@tufte@pkgname}{tufte-book}% the name of the package (defaults to tufte-handout)

%%
% Load the common style elements
\input{tufte-common.def}


%%
% Set up any book-specific stuff now

%%
% The front matter in Tufte's /Beautiful Evidence/ contains everything up
% to the opening page of Chapter 1.  The running heads, when they appear,
% contain only the (arabic) page number in the outside corner.
%\newif\if@mainmatter \@mainmattertrue
\renewcommand\frontmatter{%
  \cleardoublepage%
  \@mainmatterfalse%
  \pagenumbering{arabic}%
  %\pagestyle{plain}%
  \fancyhf{}%
  \ifthenelse{\boolean{@tufte@twoside}}%
    {\fancyhead[LE,RO]{\thepage}}%
    {\fancyhead[RE,RO]{\thepage}}%
}


%%
% The main matter in Tufte's /Beautiful Evidence/ doesn't restart the page
% numbering---it continues where it left off in the front matter.
\renewcommand\mainmatter{%
  \cleardoublepage%
  \@mainmattertrue%
  \fancyhf{}%
  \ifthenelse{\boolean{@tufte@twoside}}%
    {% two-side
      \renewcommand{\chaptermark}[1]{\markboth{##1}{}}%
      \fancyhead[LE]{\thepage\quad\smallcaps{\newlinetospace{\plaintitle}}}% book title
      \fancyhead[RO]{\smallcaps{\newlinetospace{\leftmark}}\quad\thepage}% chapter title
    }%
    {% one-side
      \fancyhead[RE,RO]{\smallcaps{\newlinetospace{\plaintitle}}\quad\thepage}% book title
    }%
}


%%
% The back matter contains appendices, indices, glossaries, endnotes,
% biliographies, list of contributors, illustration credits, etc.
\renewcommand\backmatter{%
  \if@openright%
    \cleardoublepage%
  \else%
    \clearpage%
  \fi%
  \@mainmatterfalse%
}

%%
% Only show the chapter titles in the table of contents
\setcounter{tocdepth}{0}

%%
% If there is a `tufte-book-local.sty' file, load it.

\IfFileExists{tufte-book-local.tex}{%
  \@tufte@info@noline{Loading tufte-book-local.tex}%
  \input{tufte-book-local}%
}{}

%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% END OF TUFTE TEMPLATE %%
%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%% BEGIN OF OTHERS %%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%SOPHIE TEMPLATE BEGIN%%%

%\RequirePackage[x11names]{xcolor} % Already loaded in tufte-common.def

\definecolor{trailer}{gray}{0.75}
\definecolor{question}{gray}{0.75}
\definecolor{important}{gray}{0.75}
\definecolor{learnp}{gray}{0.75}
\definecolor{warning}{gray}{0.75}
\definecolor{programcode}{gray}{0.75}
\definecolor{tips}{gray}{0.75}
\definecolor{overview}{gray}{0.55}
\definecolor{backgroundinformation}{gray}{0.5}
\definecolor{legaltext}{gray}{0.45}

\newcommand\circledmark[2][white]{%
  \ooalign{%
    \hidewidth
    \kern0.65ex\raisebox{-1.3ex}{\scalebox{3}{\textcolor{#1}{\textbullet}}}
    \hidewidth\cr
    #2\cr
  }%
}

\def\formtmp#1#2{{\vskip12pt\noindent\fboxsep=0pt\colorbox{#1}{\vbox{\vskip3pt\hbox to \textwidth{\hskip3pt\vbox{\raggedright\noindent\textbf{#2\vphantom{Qy}}}\hfill}\vspace*{3pt}}}\par\vskip2pt%
\noindent\kern0pt}}

\newenvironment{trailer}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{trailer}{#1}}{\par\noindent\textcolor{trailer}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{question}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{question}{\ \circledmark[white]{\textcolor{black}{\sf\bfseries?}}{\kern6pt}#1}}{\par\noindent\textcolor{question}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{important}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{important}{\ \circledmark{\textcolor{black}{$\ >$}}{\kern6pt}#1}}{\par\noindent\textcolor{important}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{learnp}[2][]{
  \def\envargi{#1}
  \ignorespaces\def\stmtopen##1{##1}%
  \formtmp{black}{\ \circledmark{\textcolor{black}{$\ !$}}{\kern6pt}\textcolor{white}{#2}}
}
{
  \ifx\envargi\empty
  \else
    \textsc{To learn more, go to pag. \pageref{\envargi}.}
  \fi
  \par\noindent\textcolor{black}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}
}%

\newenvironment{warning}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{warning}{\ \circledmark[white]{\textcolor{black}{!}}{\kern6pt}#1}}{\par\noindent\textcolor{warning}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{programcode}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{programcode}{File: #1}}{\noindent\textcolor{programcode}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{tips}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{tips}{Tip: #1}}{\par\noindent\textcolor{tips}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{overview}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{overview}{#1}}{\par\noindent\textcolor{overview}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%
 
\newenvironment{backgroundinformation}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{backgroundinformation}{#1}}{\par\noindent\textcolor{backgroundinformation}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

\newenvironment{legaltext}[1]{\ignorespaces\def\stmtopen##1{##1}%
\formtmp{legaltext}{#1}}{\par\noindent\textcolor{legaltext}{\rule{\columnwidth}{1pt}}\vskip2pt\par\addvspace{\baselineskip}}%

%%%SOPHIE TEMPLATE END%%%

%%
% End of file
\endinput
