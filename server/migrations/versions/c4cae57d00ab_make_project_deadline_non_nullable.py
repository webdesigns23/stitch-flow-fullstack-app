"""make project deadline non-nullable

Revision ID: c4cae57d00ab
Revises: b9c5b485b893
Create Date: 2026-06-08 13:14:30.504545

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4cae57d00ab'
down_revision = 'b9c5b485b893'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('projects', 'deadline', nullable=False)

def downgrade():
    op.alter_column('projects', 'deadline', nullable=True)
