# -*- coding: utf-8 -*-
"""Master build: assembles all chapters + Grand Revision into the final book PDF."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf

from ch1_a import CH1_A
from ch1_b import CH1_Q1
from ch1_c import CH1_Q2
from ch1_d import CH1_M1
from ch1_e import CH1_M2
from ch1_f import CH1_F

from ch2_a import CH2_A
from ch2_b import CH2_Q1
from ch2_c import CH2_Q2
from ch2_d import CH2_M1
from ch2_e import CH2_M2
from ch2_f import CH2_F

from ch3_a import CH3_A
from ch3_b import CH3_Q1
from ch3_c import CH3_Q2
from ch3_d import CH3_M1
from ch3_e import CH3_M2
from ch3_f import CH3_F

from ch4_a import CH4_A
from ch4_b import CH4_Q1
from ch4_c import CH4_Q2
from ch4_d import CH4_Q3
from ch4_e import CH4_M1
from ch4_f import CH4_M2
from ch4_g import CH4_G

from ch6_a import CH6_A
from ch6_b import CH6_Q1
from ch6_c import CH6_Q2
from ch6_d import CH6_Q3
from ch6_e import CH6_M1
from ch6_f import CH6_M2
from ch6_g import CH6_G

from ch7_a import CH7_A
from ch7_b import CH7_Q1
from ch7_c import CH7_Q2
from ch7_d import CH7_M1
from ch7_e import CH7_M2
from ch7_f import CH7_F

from gr_a import GR_A
from gr_b import GR_B
from gr_c1 import GR_C1
from gr_c2 import GR_C2
from gr_d import GR_D
from gr_e import GR_E

BLOCKS = (
    CH1_A + CH1_Q1 + CH1_Q2 + CH1_M1 + CH1_M2 + CH1_F
  + CH2_A + CH2_Q1 + CH2_Q2 + CH2_M1 + CH2_M2 + CH2_F
  + CH3_A + CH3_Q1 + CH3_Q2 + CH3_M1 + CH3_M2 + CH3_F
  + CH4_A + CH4_Q1 + CH4_Q2 + CH4_Q3 + CH4_M1 + CH4_M2 + CH4_G
  + CH6_A + CH6_Q1 + CH6_Q2 + CH6_Q3 + CH6_M1 + CH6_M2 + CH6_G
  + CH7_A + CH7_Q1 + CH7_Q2 + CH7_M1 + CH7_M2 + CH7_F
  + GR_A + GR_B + GR_C1 + GR_C2 + GR_D + GR_E
)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_body.pdf'
    nq = sum(1 for b in BLOCKS if b[0] == 'q')
    nmcq = sum(1 for b in BLOCKS if b[0] == 'mcq')
    print('Total blocks:', len(BLOCKS), '| questions:', nq, '| MCQs:', nmcq)
    build_pdf(BLOCKS, out)
    print('Built:', out)
