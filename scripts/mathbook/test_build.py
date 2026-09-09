# -*- coding: utf-8 -*-
"""Smoke-test: build a mini PDF with Chapter 1 to validate the pipeline."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf
from ch1_a import CH1_A
from ch1_b import CH1_Q1
from ch1_c import CH1_Q2
from ch1_d import CH1_M1
from ch1_e import CH1_M2
from ch1_f import CH1_F

blocks = CH1_A + CH1_Q1 + CH1_Q2 + CH1_M1 + CH1_M2 + CH1_F
out = build_pdf(blocks, "/home/z/my-project/scripts/mathbook/test_ch1.pdf", toc=True)
print("BUILT", out)

from pypdf import PdfReader
r = PdfReader(out)
print("pages:", len(r.pages))
